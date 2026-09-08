import React, { useState } from 'react';
import { Dumbbell, ArrowRight, BookOpen, Flame, Target, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';

interface TrainingPageProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onNavigateToPlans: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({
  articles,
  onReadArticle,
  onNavigateToPlans,
}) => {
  const [filter, setFilter] = useState<'All' | 'Strength' | 'Hypertrophy' | 'Technique'>('All');

  const trainingArticles = articles.filter(
    (a) => a.category === 'Training' || a.category === 'Strength' || a.category === 'Muscle Building'
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Page Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-emerald-800/40">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <Dumbbell className="w-3.5 h-3.5" />
            Training Sciences
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Science-Backed Strength & Hypertrophy
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
            Master the compound movements, understand biomechanics, and apply progressive overload principles without redundant junk volume.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onNavigateToPlans}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Explore Workout Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden lg:block pointer-events-none">
          <Dumbbell className="w-96 h-96 -right-12 -bottom-12 absolute stroke-1 text-emerald-400" />
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            1. Progressive Overload
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Gradually increase weight, reps, or technical control each week to keep stimulating structural adaptations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            2. Stimulating Reps
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Train within 1-3 Reps in Reserve (RIR). Sets taken too far from failure fail to recruit high-threshold motor units.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
            3. Movement Mastery
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Own the eccentric, brace with intra-abdominal pressure, and enforce full active range of motion across all joints.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
              Training Guides & Breakdowns
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Curated articles by Head Coach Mukesh Kumar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onReadArticle(article)}
              className="group rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    {article.date} • {article.readTime}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
