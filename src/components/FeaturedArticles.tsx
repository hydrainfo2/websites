import React from 'react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface FeaturedArticlesProps {
  mainFeatured: Article;
  stackedArticles: Article[];
  onReadArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
  onViewAllArticles: () => void;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  mainFeatured,
  stackedArticles,
  onReadArticle,
  onToggleBookmark,
  bookmarkedIds,
  onViewAllArticles,
}) => {
  return (
    <div className="w-full">
      {/* Section Title Header */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-neutral-900 dark:text-white">
            Featured Articles
          </h2>
          <div className="h-1 w-10 bg-emerald-600 rounded-full mt-2" />
        </div>

        <button
          onClick={onViewAllArticles}
          id="featured-view-all-btn"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid: Big Card on Left, 3 Stacked Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Big Main Featured Card (7 cols) */}
        <div
          onClick={() => onReadArticle(mainFeatured)}
          className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[440px] flex flex-col justify-end"
        >
          {/* Background Image */}
          <img
            src={mainFeatured.coverImage}
            alt={mainFeatured.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Dark Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              {mainFeatured.category}
            </span>

            <button
              onClick={(e) => onToggleBookmark(mainFeatured.id, e)}
              aria-label="Bookmark article"
              className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                bookmarkedIds.has(mainFeatured.id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black/40 hover:bg-black/60 text-white/90'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  bookmarkedIds.has(mainFeatured.id) ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>

          {/* Content at bottom */}
          <div className="relative p-6 sm:p-8 z-10">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-medium mb-3">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{mainFeatured.readTime}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-tight mb-2.5 group-hover:text-emerald-300 transition-colors">
              {mainFeatured.title}
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-2">
              {mainFeatured.excerpt}
            </p>
          </div>
        </div>

        {/* 3 Stacked Articles on Right (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
          {stackedArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onReadArticle(article)}
              className="group flex items-center gap-4 sm:gap-5 p-3 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="relative w-28 sm:w-36 h-24 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    {article.category}
                  </span>

                  <button
                    onClick={(e) => onToggleBookmark(article.id, e)}
                    aria-label="Bookmark article"
                    className="text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarkedIds.has(article.id)
                          ? 'fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400'
                          : ''
                      }`}
                    />
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2 mb-2">
                  {article.title}
                </h4>

                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
