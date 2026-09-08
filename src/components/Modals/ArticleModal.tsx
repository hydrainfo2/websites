import React, { useState } from 'react';
import {
  X,
  Clock,
  Calendar,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Article } from '../../types';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white/95 dark:bg-neutral-900/95">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white">
              {article.category}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label="Bookmark article"
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              aria-label="Share article"
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Article Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight mb-3">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Cover Hero Image */}
          <div className="rounded-xl overflow-hidden h-64 sm:h-80 w-full relative bg-neutral-100 dark:bg-neutral-800">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Intro */}
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
            {article.content.intro}
          </p>

          {/* Key Takeaways Card */}
          <div className="p-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Core Takeaways</span>
            </div>
            <ul className="space-y-2">
              {article.content.takeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 pt-2">
            {article.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {sec.heading}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {sec.body}
                </p>

                {sec.bulletPoints && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {sec.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                )}

                {sec.tip && (
                  <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border-l-4 border-emerald-600 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Coach Tip:{' '}
                    </span>
                    {sec.tip}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Card */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center gap-4 mt-6">
            <img
              src={article.content.author.avatar}
              alt={article.content.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-600/30"
            />
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {article.content.author.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {article.content.author.role}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
