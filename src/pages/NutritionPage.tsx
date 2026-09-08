import React from 'react';
import { Apple, ArrowRight, Sparkles, Scale, PieChart, Utensils } from 'lucide-react';
import { Article, ToolType } from '../types';

interface NutritionPageProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onOpenTool: (tool: ToolType) => void;
  onNavigateToRecipes: () => void;
}

export const NutritionPage: React.FC<NutritionPageProps> = ({
  articles,
  onReadArticle,
  onOpenTool,
  onNavigateToRecipes,
}) => {
  const nutritionArticles = articles.filter(
    (a) => a.category === 'Nutrition' || a.category === 'Fat Loss'
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Page Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-emerald-700/40">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <Apple className="w-3.5 h-3.5" />
            Nutritional Science
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Fueling For Performance & Composition
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
            Ditch restrictive fad diets. Learn evidence-based macronutrient targets, energy balance, and how to fuel heavy lifting while staying lean.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => onOpenTool('macro')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <PieChart className="w-4 h-4" />
              <span>Calculate My Macros</span>
            </button>
            <button
              onClick={onNavigateToRecipes}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore High-Protein Recipes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Macro Rule-of-Thumb Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Protein Target
          </span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-1 mb-2">
            1.6 – 2.2 g / kg
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Essential for muscle protein synthesis and preserving lean tissue during caloric restriction.
          </p>
          <button
            onClick={() => onOpenTool('protein')}
            className="mt-4 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
          >
            <span>Open Protein Calculator</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Carbohydrate Energy
          </span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-1 mb-2">
            3.0 – 6.0 g / kg
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Primary substrate for high-intensity muscular contractions and replenishment of muscle glycogen.
          </p>
          <button
            onClick={() => onOpenTool('macro')}
            className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Calculate Carb Split</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Hormonal Fats
          </span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-1 mb-2">
            0.6 – 1.0 g / kg
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Vital for testosterone synthesis, endocrine balance, fat-soluble vitamin absorption, and joint health.
          </p>
          <button
            onClick={() => onOpenTool('calorie')}
            className="mt-4 text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
          >
            <span>Find TDEE Maintenance</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Nutrition Articles */}
      <div>
        <div className="mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Nutrition Articles & Research
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Science-based nutrition guides without the supplement marketing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutritionArticles.map((article) => (
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
                  <span>Read Breakdown</span>
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
