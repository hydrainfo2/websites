import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onStartTraining: () => void;
  onExploreArticles: () => void;
  onReadArticle: (articleId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartTraining,
  onExploreArticles,
  onReadArticle,
}) => {
  return (
    <section className="w-full mb-8 sm:mb-10">
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-gradient-to-r from-[#edf2ef] via-[#f1f5f3] to-[#e4eae6] dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 z-10 flex flex-col justify-center">
            {/* Category Tag */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#064e3b] text-white">
                TRAINING
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-neutral-900 dark:text-white leading-[1.12] mb-4">
              Build a Stronger Body
              <br className="hidden sm:inline" /> Without Wasting Your Time
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Practical training guides, science-backed fitness advice, and
              simple strategies to help you become stronger and healthier.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={onStartTraining}
                id="hero-start-training-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                Start Training
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreArticles}
                id="hero-explore-articles-btn"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 border border-neutral-300/80 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all cursor-pointer"
              >
                Explore Articles
              </button>
            </div>

            {/* Metadata Footer */}
            <div className="flex items-center gap-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span>Updated Sep 2026</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[400px] lg:h-full min-h-[440px] w-full overflow-hidden">
            {/* Athlete gym image */}
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
              alt="Athletic man training with dumbbells"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center lg:object-[60%_35%] filter brightness-95 contrast-105"
            />

            {/* Gradient overlays for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#edf2ef] dark:from-neutral-900 to-transparent" />

            {/* "Better Stronger Healthier" Handwritten Overlay */}
            <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col items-start select-none pointer-events-none drop-shadow-lg">
              <div className="font-script text-4xl sm:text-5xl lg:text-6xl text-white/95 font-bold tracking-wide -rotate-6 space-y-1">
                <div className="hover:scale-105 transition-transform duration-300">
                  Better
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  Stronger
                </div>
                <div className="relative hover:scale-105 transition-transform duration-300">
                  Healthier
                  {/* Swoosh Underline */}
                  <svg
                    className="w-32 sm:w-40 h-6 text-white/90 stroke-current fill-none mt-0.5"
                    viewBox="0 0 160 24"
                  >
                    <path
                      d="M6 16C38 6 82 4 154 18"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
