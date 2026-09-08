import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  EyeOff,
  Edit3,
  List,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  BookOpen,
  Database,
  Key,
  ShieldCheck,
  Lock,
  LogOut,
  User,
  AlertCircle,
} from 'lucide-react';
import { Article } from '../../types';
import {
  fetchHealthStatus,
  HealthStatus,
  getStoredAdminKey,
  getStoredAdminUser,
  clearStoredAdminSession,
  loginAdminWithPassword,
  AdminUser,
} from '../../api';

interface AdminPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  articles: Article[];
}

const PRESET_IMAGES = [
  {
    label: 'Barbell Heavy Lift',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: 'Dumbbells Athlete',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: 'Nutrition Bowl',
    url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: 'Recovery Stretching',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: 'Pushup Core Strength',
    url: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=1200&auto=format&fit=crop',
  },
  {
    label: 'Runner Cardio Track',
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  'Training',
  'Strength',
  'Nutrition',
  'Wellness',
  'Muscle Building',
  'Fat Loss',
  'Mobility',
  'Recovery',
  'Home Workouts',
  'Running',
] as const;

export const AdminPostModal: React.FC<AdminPostModalProps> = ({
  isOpen,
  onClose,
  onPublishArticle,
  onDeleteArticle,
  articles,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'preview'>('create');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Article['category']>('Training');
  const [readTime, setReadTime] = useState('6 min read');
  const [date, setDate] = useState('Sep 8, 2026');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [intro, setIntro] = useState('');
  const [featured, setFeatured] = useState(false);
  const [popular, setPopular] = useState(false);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchHealthStatus().then((status) => {
        if (status) setHealthStatus(status);
      });
    }
  }, [isOpen]);

  // Sections
  const [sections, setSections] = useState<
    { heading: string; body: string; bulletPoints: string[]; tip: string }[]
  >([
    {
      heading: 'The Core Biomechanical Mechanics',
      body: 'Understanding joint angles and muscle torque allows you to generate maximum tension while sparing passive ligaments.',
      bulletPoints: ['Control the eccentric phase for 2-3 seconds', 'Maintain a neutral spine and diaphragmatic brace'],
      tip: 'Never sacrifice active range of motion just to chase numerical ego loading on the barbell.',
    },
  ]);

  // Takeaways
  const [takeaways, setTakeaways] = useState<string[]>([
    'Progressive overload is the fundamental driver of muscular adaptation.',
    'Quality repetitions within 1-3 RIR beat excessive junk volume.',
    'Fuel adequately with 1.6-2.2g of protein per kg of body weight.',
  ]);

  // Author
  const [authorName, setAuthorName] = useState('Mukesh Kumar');
  const [authorRole, setAuthorRole] = useState('Head Coach & CSCS');
  const [authorAvatar, setAuthorAvatar] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  );

  const [validationError, setValidationError] = useState<string | null>(null);

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(getStoredAdminKey()));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredAdminUser());
  const [loginUsername, setLoginUsername] = useState('Coach Mukesh');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Sync authentication state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(Boolean(getStoredAdminKey()));
      setAdminUser(getStoredAdminUser());
      setLoginError(null);
    }
  }, [isOpen]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginPassword.trim()) {
      setLoginError('Please enter your administrator password.');
      return;
    }
    setIsLoggingIn(true);
    setLoginError(null);

    const res = await loginAdminWithPassword(loginPassword.trim(), loginUsername);
    setIsLoggingIn(false);

    if (res.success && res.token) {
      setIsAuthenticated(true);
      setAdminUser(res.user || { username: loginUsername, displayName: 'Mukesh Kumar', role: 'Chief Editor' });
      setLoginPassword('');
      setLoginError(null);
    } else {
      setLoginError(res.error || 'Incorrect admin password. Please try again.');
    }
  };

  const handleLogout = () => {
    clearStoredAdminSession();
    setIsAuthenticated(false);
    setAdminUser(null);
    setLoginPassword('');
    setLoginError(null);
  };

  if (!isOpen) return null;

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        heading: `Section ${sections.length + 1}: Key Principle`,
        body: 'Provide detailed, science-backed guidance and practical application for this topic.',
        bulletPoints: ['First core actionable step', 'Second progressive guideline'],
        tip: 'Coach tip: Consistency over weeks beats random maximal intensity.',
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (
    index: number,
    field: 'heading' | 'body' | 'tip',
    value: string
  ) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleAddTakeaway = () => {
    setTakeaways([...takeaways, 'New actionable takeaway summary for the athlete.']);
  };

  const handleRemoveTakeaway = (index: number) => {
    if (takeaways.length <= 1) return;
    setTakeaways(takeaways.filter((_, i) => i !== index));
  };

  const handleTakeawayChange = (index: number, val: string) => {
    const updated = [...takeaways];
    updated[index] = val;
    setTakeaways(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter an article title.');
      return;
    }
    if (!excerpt.trim()) {
      setValidationError('Please provide a short excerpt/summary.');
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newArticle: Article = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      slug,
      category,
      readTime,
      date,
      coverImage: coverImage.trim() || PRESET_IMAGES[0].url,
      excerpt: excerpt.trim(),
      featured,
      popular,
      content: {
        intro: intro.trim() || excerpt.trim(),
        sections: sections.map((s) => ({
          heading: s.heading,
          body: s.body,
          bulletPoints: s.bulletPoints.filter((b) => b.trim().length > 0),
          tip: s.tip.trim() || undefined,
        })),
        takeaways: takeaways.filter((t) => t.trim().length > 0),
        author: {
          name: authorName,
          role: authorRole,
          avatar: authorAvatar,
        },
      },
    };

    onPublishArticle(newArticle);

    // Reset Form
    setTitle('');
    setExcerpt('');
    setIntro('');
    setFeatured(false);
    setPopular(false);
    setValidationError(null);
    setActiveTab('manage');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              {isAuthenticated ? <Edit3 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2 flex-wrap">
                <span>Mukesh Fitness Editorial CMS</span>
                {isAuthenticated ? (
                  <>
                    <span className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{adminUser?.displayName || 'Admin'}</span>
                    </span>
                    {healthStatus && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 border ${
                          healthStatus.mongoConnected
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        }`}
                        title={
                          healthStatus.mongoConnected
                            ? 'Connected directly to MongoDB Atlas cluster'
                            : 'Running with Node.js in-memory database fallback. Set MONGODB_URI to connect your cluster.'
                        }
                      >
                        <Database className="w-3 h-3" />
                        <span>{healthStatus.mongoConnected ? 'MongoDB Live' : 'Node.js Backend'}</span>
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-neutral-500" />
                    <span>Password Required</span>
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isAuthenticated
                  ? 'Publish, preview, or manage training & nutrition research articles'
                  : 'Enter your administrator password to unlock the article publishing suite'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 text-neutral-600 dark:text-neutral-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Log out of Admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Login View vs. Authenticated CMS View */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto w-full my-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-xs border border-emerald-200 dark:border-emerald-800">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
              Admin Editorial Login
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 mb-6 max-w-xs">
              Sign in with your admin password to publish, update, and manage science-backed fitness research articles.
            </p>

            {loginError && (
              <div className="w-full mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Admin Name / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Coach Mukesh"
                    className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError(null);
                    }}
                    placeholder="Enter password..."
                    autoFocus
                    className="w-full px-3.5 py-2.5 pl-9 pr-10 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer p-0.5"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Dev helper shortcut */}
              <div className="pt-0.5 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Development Password:</span>
                <button
                  type="button"
                  onClick={() => {
                    setLoginPassword('mukesh-admin-2026');
                    setLoginError(null);
                  }}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-bold cursor-pointer"
                >
                  Quick Fill: mukesh-admin-2026
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Password...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to Admin CMS</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-6">
              Security Notice: Admin sessions are protected by IP rate-limiting and server-side secret validation.
            </p>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 gap-6">
              <button
                onClick={() => setActiveTab('create')}
                className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'create'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'manage'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Published Posts ({articles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('preview')}
                className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Live Article Preview</span>
              </button>
            </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {validationError && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center justify-between">
              <span>{validationError}</span>
              <button onClick={() => setValidationError(null)} className="text-rose-500 hover:underline">
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: CREATE NEW ARTICLE FORM */}
          {activeTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Science of Deload Weeks: When and How to Back Off"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500 font-semibold"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Article['category'])}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Read Time & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 7 min read"
                    className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Publication Date Stamp
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Sep 8, 2026"
                    className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                  />
                </div>
              </div>

              {/* Cover Image & Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Or select a curated fitness preset image:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-1.5">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCoverImage(img.url)}
                        className={`h-14 rounded-lg overflow-hidden relative border-2 transition-all cursor-pointer ${
                          coverImage === img.url
                            ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        title={img.label}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[9px] text-white font-bold text-center px-1">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Excerpt & Intro */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Card Excerpt (Summary for article preview card) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short, compelling 1-2 sentence description that appears on the homepage..."
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Article Lead Introduction
                </label>
                <textarea
                  rows={3}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="The introductory paragraph setting the stage for the reader inside the article modal..."
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-emerald-500 resize-none"
                />
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      Article Sections ({sections.length})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Organize the breakdown into structured headings, paragraphs, and coach tips.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                          Section #{idx + 1}
                        </span>
                        {sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                        placeholder="Section Heading"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-semibold focus:outline-emerald-500"
                      />

                      <textarea
                        rows={3}
                        value={sec.body}
                        onChange={(e) => handleSectionChange(idx, 'body', e.target.value)}
                        placeholder="Section content and scientific explanation..."
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-emerald-500 resize-none"
                      />

                      <input
                        type="text"
                        value={sec.tip}
                        onChange={(e) => handleSectionChange(idx, 'tip', e.target.value)}
                        placeholder="Coach Pro-Tip (optional callout banner)"
                        className="w-full px-3 py-2 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-xs focus:outline-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Takeaways */}
              <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Key Actionable Takeaways ({takeaways.length})
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddTakeaway}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bullet Point</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {takeaways.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={t}
                        onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:outline-emerald-500"
                      />
                      {takeaways.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTakeaway(idx)}
                          className="p-2 text-neutral-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Homepage Features Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm accent-emerald-600"
                  />
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">
                      Featured Article
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Promote this piece in the Featured carousel & grid
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm accent-emerald-600"
                  />
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">
                      Popular Sidebar Post
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Show in the Popular Posts column on the right
                    </div>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Article Live</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE PUBLISHED ARTICLES */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Below are all currently active articles in the Mukesh Fitness database. Custom articles are saved locally to your device.
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded-lg object-cover bg-neutral-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {art.category}
                          </span>
                          {art.featured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              Featured
                            </span>
                          )}
                          <span className="text-xs text-neutral-400">
                            {art.date} • {art.readTime}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-900 dark:text-white text-sm line-clamp-1">
                          {art.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setTitle(art.title);
                          setCategory(art.category);
                          setReadTime(art.readTime);
                          setDate(art.date);
                          setCoverImage(art.coverImage);
                          setExcerpt(art.excerpt);
                          setIntro(art.content.intro);
                          setSections(art.content.sections.map((s) => ({
                            heading: s.heading,
                            body: s.body,
                            bulletPoints: s.bulletPoints || [],
                            tip: s.tip || '',
                          })));
                          setTakeaways(art.content.takeaways || []);
                          setFeatured(!!art.featured);
                          setPopular(!!art.popular);
                          setActiveTab('create');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1 cursor-pointer"
                        title="Load into Editor"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => onDeleteArticle(art.id)}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                This is a live preview of how the new article will look inside the reading experience:
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 p-6 space-y-6">
                <div className="h-64 rounded-xl overflow-hidden relative">
                  <img
                    src={coverImage || PRESET_IMAGES[0].url}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white">
                    {category}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {date}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight mb-3">
                    {title || 'Article Title Preview'}
                  </h1>

                  <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed italic border-l-4 border-emerald-500 pl-4 mb-6">
                    {intro || excerpt || 'Article lead introduction and high-level synopsis...'}
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  {sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {sec.heading}
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {sec.body}
                      </p>
                      {sec.tip && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-600 text-xs text-emerald-900 dark:text-emerald-200">
                          <strong>Coach Tip:</strong> {sec.tip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Takeaways */}
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                    Key Actionable Takeaways
                  </h4>
                  <ul className="space-y-1.5">
                    {takeaways.map((t, idx) => (
                      <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};
