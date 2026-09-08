import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import {
  initMongo,
  isMongoConnected,
  mongoConnectionError,
  getAllArticles,
  getArticleByIdOrSlug,
  saveArticle,
  deleteArticleById,
  saveSubscriber,
  getSubscribersCount,
} from './server/db';
import { Article } from './src/types';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Enable trust proxy for Google Cloud Run / Nginx reverse proxy
  app.set('trust proxy', 1);

  // 1. Security Headers (Configured safely for AI Studio preview iframe and dynamic media)
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allows Vite inline scripts and external Unsplash images
      crossOriginEmbedderPolicy: false,
      frameguard: false, // Critical: Allows preview inside AI Studio iframe
    })
  );

  // Initialize JSON body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 2. Global API Rate Limiting (Protects endpoints from automated scraping & flooding)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, forwardedHeader: false },
    message: { success: false, error: 'Too many requests from this IP, please try again in 15 minutes.' },
  });
  app.use('/api', apiLimiter);

  // Stricter limiter for public newsletter signups
  const newsletterLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, forwardedHeader: false },
    message: { success: false, error: 'Too many newsletter signups from this IP. Please try again later.' },
  });

  // Limiter for admin operations
  const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false, forwardedHeader: false },
    message: { success: false, error: 'Too many admin requests. Please try again later.' },
  });

  // 3. Admin Authentication Middleware
  const isValidAdminSecret = (provided: string | undefined): boolean => {
    if (!provided) return false;
    const trimmed = String(provided).trim();
    if (!trimmed) return false;

    const envPass = process.env.ADMIN_PASSWORD?.trim();
    const envKey = process.env.ADMIN_SECRET_KEY?.trim();
    const defaultPass = 'mukesh-admin-2026';

    return (
      (Boolean(envPass) && trimmed === envPass) ||
      (Boolean(envKey) && trimmed === envKey) ||
      trimmed === defaultPass
    );
  };

  const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const rawKey =
      (req.headers['x-admin-key'] as string) ||
      (req.headers['x-admin-password'] as string) ||
      (req.headers['authorization']?.replace(/^Bearer\s+/i, '') as string) ||
      (req.body?.adminKey as string) ||
      (req.body?.adminPassword as string) ||
      (req.body?.password as string);

    if (!isValidAdminSecret(rawKey)) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: A valid administrator password is required to perform this action.',
      });
    }
    next();
  };

  // Initialize MongoDB connection
  initMongo().catch((err) => {
    console.error('Mongo initialization caught error:', err);
  });

  // ==========================================
  // REST API ROUTES
  // ==========================================

  // 1. Health & Status
  app.get('/api/health', async (req, res) => {
    const subscriberCount = await getSubscribersCount();
    const articles = await getAllArticles();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      backend: 'Node.js Express',
      database: isMongoConnected ? 'MongoDB (Connected)' : 'In-Memory Store (Fallback)',
      mongoConnected: isMongoConnected,
      mongoUriConfigured: Boolean(process.env.MONGODB_URI),
      security: {
        helmetEnabled: true,
        rateLimitEnabled: true,
        adminAuthEnabled: true,
      },
      stats: {
        articlesCount: articles.length,
        subscribersCount: subscriberCount,
      },
      error: mongoConnectionError,
    });
  });

  // 1b. Admin Password Login Endpoint
  app.post('/api/admin/login', adminLimiter, (req, res) => {
    const { username, password } = req.body || {};

    const provided =
      password ||
      (req.headers['x-admin-password'] as string) ||
      (req.headers['x-admin-key'] as string);

    if (!isValidAdminSecret(provided)) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect administrator password. Please try again.',
      });
    }

    const cleanUsername = username ? String(username).trim() : 'Coach Mukesh';
    const effectiveToken = String(provided).trim();

    res.json({
      success: true,
      message: 'Admin authenticated successfully',
      token: effectiveToken,
      user: {
        username: cleanUsername,
        displayName: 'Mukesh Kumar',
        role: 'Chief Editor & CSCS Coach',
        authenticatedAt: new Date().toISOString(),
      },
    });
  });

  // 1c. Admin Session Verification
  app.post('/api/admin/verify', adminLimiter, (req, res) => {
    const rawKey =
      (req.headers['x-admin-key'] as string) ||
      (req.headers['x-admin-password'] as string) ||
      (req.headers['authorization']?.replace(/^Bearer\s+/i, '') as string) ||
      (req.body?.adminKey as string) ||
      (req.body?.adminPassword as string) ||
      (req.body?.password as string);

    if (!isValidAdminSecret(rawKey)) {
      return res.status(401).json({ success: false, error: 'Session expired or invalid admin credentials' });
    }
    res.json({
      success: true,
      message: 'Admin session active',
      token: String(rawKey).trim(),
      user: {
        username: 'Coach Mukesh',
        displayName: 'Mukesh Kumar',
        role: 'Chief Editor & CSCS Coach',
      },
    });
  });

  // 2. Get All Articles (with optional filtering)
  app.get('/api/articles', async (req, res) => {
    try {
      const { category, search } = req.query;
      let articles = await getAllArticles();

      if (category && typeof category === 'string' && category !== 'All') {
        articles = articles.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (search && typeof search === 'string') {
        const query = search.toLowerCase();
        articles = articles.filter(
          (a) =>
            a.title.toLowerCase().includes(query) ||
            a.excerpt.toLowerCase().includes(query) ||
            a.category.toLowerCase().includes(query)
        );
      }

      res.json({
        success: true,
        count: articles.length,
        data: articles,
        source: isMongoConnected ? 'mongodb' : 'fallback-store',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Get Single Article by ID or Slug
  app.get('/api/articles/:id', async (req, res) => {
    try {
      const article = await getArticleByIdOrSlug(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.json({ success: true, data: article });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Create or Update Article (Admin Post - Protected by Admin Secret Key & Rate Limiting)
  app.post('/api/articles', adminLimiter, requireAdminAuth, async (req, res) => {
    try {
      const body = req.body as Partial<Article>;

      if (!body.title || !body.excerpt) {
        return res.status(400).json({
          success: false,
          error: 'Title and excerpt are required',
        });
      }

      const newArticle: Article = {
        id: body.id || `article-${Date.now()}`,
        title: body.title,
        slug:
          body.slug ||
          body.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-'),
        category: (body.category as any) || 'Training',
        tagColor: body.tagColor || 'bg-emerald-100 text-emerald-800',
        readTime: body.readTime || '5 min read',
        date: body.date || 'Updated Sep 2026',
        coverImage:
          body.coverImage ||
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        excerpt: body.excerpt,
        featured: Boolean(body.featured),
        popular: Boolean(body.popular),
        content: body.content || {
          intro: body.excerpt,
          sections: [
            {
              heading: '1. Overview & Key Principles',
              body: body.excerpt,
            },
          ],
          takeaways: ['Consistency drives long-term adaptation.'],
          author: {
            name: 'Mukesh Kumar',
            role: 'CSCS & Head Coach',
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
          },
        },
      };

      const saved = await saveArticle(newArticle);
      res.status(201).json({
        success: true,
        message: isMongoConnected
          ? 'Article saved to MongoDB successfully!'
          : 'Article saved to database store successfully!',
        data: saved,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Delete Article (Protected by Admin Secret Key & Rate Limiting)
  app.delete('/api/articles/:id', adminLimiter, requireAdminAuth, async (req, res) => {
    try {
      const deleted = await deleteArticleById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.json({ success: true, message: 'Article deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Subscribe to Newsletter (Rate-limited to prevent abuse)
  app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email is required' });
      }

      const result = await saveSubscriber(email);
      res.json({
        success: true,
        message: result.message,
        email,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. General Application Stats
  app.get('/api/stats', async (req, res) => {
    try {
      const articles = await getAllArticles();
      const subscribersCount = await getSubscribersCount();

      const categoryCounts: Record<string, number> = {};
      articles.forEach((a) => {
        categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
      });

      res.json({
        success: true,
        database: isMongoConnected ? 'MongoDB' : 'In-Memory Store',
        totalArticles: articles.length,
        totalSubscribers: subscribersCount,
        categoryCounts,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE / PRODUCTION STATIC FILES
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Node.js Express server running on port ${PORT}`);
    console.log(`📡 Health endpoint: http://localhost:${PORT}/api/health`);
    console.log(`📚 Articles endpoint: http://localhost:${PORT}/api/articles`);
  });
}

startServer();
