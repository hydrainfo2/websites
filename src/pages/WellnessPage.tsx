import React, { useState } from 'react';
import { Heart, Moon, Activity, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface WellnessPageProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
}

export const WellnessPage: React.FC<WellnessPageProps> = ({
  articles,
  onReadArticle,
}) => {
  const wellnessArticles = articles.filter(
    (a) => a.category === 'Wellness' || a.category === 'Mobility' || a.category === 'Recovery'
  );

  // Mini Interactive Sleep & Recovery Scorecard
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stressLevel, setStressLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [soreness, setSoreness] = useState<'mild' | 'heavy'>('mild');

  const calculateReadinessScore = () => {
    let score = 50;
    if (sleepHours >= 8) score += 30;
    else if (sleepHours >= 7) score += 20;
    else if (sleepHours >= 6) score += 10;
    else score -= 15;

    if (stressLevel === 'low') score += 15;
    else if (stressLevel === 'high') score -= 15;

    if (soreness === 'mild') score += 10;
    else score -= 10;

    return Math.max(10, Math.min(100, score));
  };

  const readiness = calculateReadinessScore();

  return (
    <div className="space-y-12 pb-16">
      {/* Page Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-emerald-900/50">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <Heart className="w-3.5 h-3.5" />
            Holistic Recovery
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Recovery & Longevity Science
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
            You don't grow in the gym; you break tissue down. Growth occurs during restorative sleep, nervous system down-regulation, and targeted joint mobility.
          </p>
        </div>
      </div>

      {/* Interactive Recovery Readiness Calculator */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Interactive Tool
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
              Daily Training Readiness Check
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Estimate whether your central nervous system is primed for maximal loads or active recovery today.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-950/40 px-5 py-3 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
            <div>
              <div className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300">
                Readiness Score
              </div>
              <div className="text-3xl font-black text-emerald-800 dark:text-emerald-400">
                {readiness} / 100
              </div>
            </div>
            <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 border-l border-emerald-200 dark:border-emerald-800 pl-4">
              {readiness >= 80 ? '🟢 Green Light: Go Heavy' : readiness >= 60 ? '🟡 Yellow: Moderate RIR' : '🔴 Red: Prioritize Sleep & Walk'}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
              Sleep Duration: {sleepHours} hrs
            </label>
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
              Life Stress Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'moderate', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setStressLevel(lvl)}
                  className={`py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                    stressLevel === lvl
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
              Delayed Muscle Soreness (DOMS)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['mild', 'heavy'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSoreness(s)}
                  className={`py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                    soreness === s
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wellness & Mobility Articles */}
      <div>
        <div className="mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Recovery & Mobility Articles
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Keep your joints resilient and your central nervous system restored
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wellnessArticles.map((article) => (
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
                  <span>Read Protocol</span>
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
