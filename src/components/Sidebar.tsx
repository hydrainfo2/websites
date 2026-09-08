import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';

interface SidebarProps {
  popularPosts: Article[];
  onReadArticle: (article: Article) => void;
  onViewAllPopular: () => void;
  onSubscribeEmail: (email: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  popularPosts,
  onReadArticle,
  onViewAllPopular,
  onSubscribeEmail,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onSubscribeEmail(email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <aside className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
      {/* Newsletter Card */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs">
        {/* Circular Mail Icon Badge */}
        <div className="w-12 h-12 rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
          <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center">
            <Mail className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Get stronger every week.
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
          Weekly training, nutrition, and recovery advice without the fitness
          industry nonsense.
        </p>

        {isSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-sm font-semibold">
              You're in! Check your inbox for the starter routine.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300/80 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600"
              />
              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="px-5 py-2.5 rounded-lg bg-[#064e3b] hover:bg-emerald-800 active:scale-98 text-white text-sm font-bold shadow-xs transition-all shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>

      {/* Popular Posts */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xs">
        {/* Popular Posts Header */}
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Popular Posts
          </h3>
          <button
            onClick={onViewAllPopular}
            id="popular-view-all-btn"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Popular Post Items */}
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onReadArticle(post)}
              className="group flex items-center gap-3.5 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {post.date} • {post.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
