import mongoose from 'mongoose';
import { articles as initialArticles } from '../src/data/fitnessData';
import { Article } from '../src/types';

export let isMongoConnected = false;
export let mongoConnectionError: string | null = null;

// Mongoose Schema for Articles
const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  tagColor: { type: String },
  readTime: { type: String, default: '5 min read' },
  date: { type: String, default: 'Sep 2026' },
  coverImage: { type: String, required: true },
  excerpt: { type: String, required: true },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  content: {
    intro: { type: String, default: '' },
    sections: [
      {
        heading: { type: String },
        body: { type: String },
        bulletPoints: [{ type: String }],
        tip: { type: String },
      },
    ],
    takeaways: [{ type: String }],
    author: {
      name: { type: String, default: 'Mukesh Sharma' },
      role: { type: String, default: 'CSCS & Head Coach' },
      avatar: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

export const ArticleModel = mongoose.model('Article', ArticleSchema);

// Mongoose Schema for Newsletter Subscribers
const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  source: { type: String, default: 'website' },
  subscribedAt: { type: Date, default: Date.now },
});

export const NewsletterModel = mongoose.model('Newsletter', NewsletterSchema);

// In-Memory Database Store (Fallback for when MONGODB_URI is not provided or connecting)
let inMemoryArticles: Article[] = [...initialArticles];
const inMemorySubscribers: { email: string; subscribedAt: Date }[] = [];

// Initialize MongoDB Connection (Non-blocking with graceful fallback)
export async function initMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log(
      'ℹ️ [MongoDB] MONGODB_URI is not configured in environment. Operating with in-memory database store. Add MONGODB_URI to .env or Settings to connect your MongoDB Atlas cluster.'
    );
    isMongoConnected = false;
    return;
  }

  try {
    console.log('🔄 [MongoDB] Connecting to MongoDB...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    mongoConnectionError = null;
    console.log('✅ [MongoDB] Successfully connected to MongoDB cluster!');

    // Seed database if empty
    const count = await ArticleModel.countDocuments();
    if (count === 0) {
      console.log('🌱 [MongoDB] Seeding initial fitness articles into MongoDB...');
      await ArticleModel.insertMany(initialArticles);
      console.log(`✅ [MongoDB] Seeded ${initialArticles.length} articles into MongoDB.`);
    }
  } catch (err: any) {
    mongoConnectionError = err.message;
    isMongoConnected = false;
    console.warn(
      `⚠️ [MongoDB] Connection warning: ${err.message}. Seamlessly falling back to in-memory database store.`
    );
  }
}

// Database helper operations supporting both MongoDB and In-Memory Fallback
export async function getAllArticles(): Promise<Article[]> {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const docs = await ArticleModel.find().sort({ createdAt: -1 }).lean();
      return docs as unknown as Article[];
    } catch (err) {
      console.error('Error fetching articles from MongoDB, falling back:', err);
    }
  }
  return inMemoryArticles;
}

export async function getArticleByIdOrSlug(idOrSlug: string): Promise<Article | null> {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const doc = await ArticleModel.findOne({
        $or: [{ id: idOrSlug }, { slug: idOrSlug }],
      }).lean();
      if (doc) return doc as unknown as Article;
    } catch (err) {
      console.error('Error fetching article from MongoDB:', err);
    }
  }
  return inMemoryArticles.find((a) => a.id === idOrSlug || a.slug === idOrSlug) || null;
}

export async function saveArticle(articleData: Article): Promise<Article> {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      // Upsert into MongoDB
      const updated = await ArticleModel.findOneAndUpdate(
        { id: articleData.id },
        { ...articleData, createdAt: new Date() },
        { upsert: true, new: true }
      ).lean();
      // Keep in-memory cache in sync
      inMemoryArticles = [articleData, ...inMemoryArticles.filter((a) => a.id !== articleData.id)];
      return updated as unknown as Article;
    } catch (err) {
      console.error('MongoDB save error, updating in-memory:', err);
    }
  }

  // In-Memory store update
  inMemoryArticles = [articleData, ...inMemoryArticles.filter((a) => a.id !== articleData.id)];
  return articleData;
}

export async function deleteArticleById(id: string): Promise<boolean> {
  let deleted = false;
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      const res = await ArticleModel.deleteOne({ id });
      deleted = (res.deletedCount || 0) > 0;
    } catch (err) {
      console.error('MongoDB delete error:', err);
    }
  }

  const initialLength = inMemoryArticles.length;
  inMemoryArticles = inMemoryArticles.filter((a) => a.id !== id);
  if (inMemoryArticles.length < initialLength) {
    deleted = true;
  }
  return deleted;
}

export async function saveSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      await NewsletterModel.findOneAndUpdate(
        { email: email.toLowerCase() },
        { email: email.toLowerCase(), subscribedAt: new Date() },
        { upsert: true }
      );
      return { success: true, message: 'Subscribed successfully in MongoDB' };
    } catch (err: any) {
      console.error('MongoDB newsletter subscription error:', err);
    }
  }

  const exists = inMemorySubscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    inMemorySubscribers.push({ email, subscribedAt: new Date() });
  }
  return { success: true, message: 'Subscribed successfully' };
}

export async function getSubscribersCount(): Promise<number> {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    try {
      return await NewsletterModel.countDocuments();
    } catch (err) {
      console.error('MongoDB subscriber count error:', err);
    }
  }
  return inMemorySubscribers.length;
}
