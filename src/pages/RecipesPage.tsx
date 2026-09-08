import React, { useState } from 'react';
import { Utensils, Clock, Flame, PieChart, Check, X, ChefHat } from 'lucide-react';
import { Recipe } from '../types';
import { sampleRecipes } from '../data/workoutAndRecipeData';

export const RecipesPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const filtered = sampleRecipes.filter((r) => {
    if (selectedCat === 'All') return true;
    return r.category === selectedCat;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Page Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-950 to-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-teal-800/40">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <ChefHat className="w-3.5 h-3.5" />
            Performance Kitchen
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            High-Protein Meal Prep & Quick Recipes
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Delicious, nutrient-dense meals calculated for muscle retention and fat loss. No bland unseasoned chicken and rice.
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800'
            }`}
          >
            {cat === 'All' ? 'All Recipes' : cat}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setActiveRecipe(recipe)}
            className="group rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <img
                src={recipe.image}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                {recipe.category}
              </span>
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-black/75 text-white backdrop-blur-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.prepTime}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug mb-2 text-base">
                  {recipe.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4">
                  {recipe.description}
                </p>
              </div>

              {/* Macro pills */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-4 gap-1 text-center">
                <div className="bg-neutral-50 dark:bg-neutral-800/80 p-1.5 rounded-lg">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Cals</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{recipe.calories}</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/50 p-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Prot</div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">{recipe.protein}g</div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800/80 p-1.5 rounded-lg">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Carb</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{recipe.carbs}g</div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800/80 p-1.5 rounded-lg">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Fat</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{recipe.fats}g</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
            <button
              onClick={() => setActiveRecipe(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {activeRecipe.category}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Prep: {activeRecipe.prepTime} • {activeRecipe.servings} serving
              </span>
            </div>

            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">
              {activeRecipe.title}
            </h2>

            {/* Macro Summary Bar */}
            <div className="grid grid-cols-4 gap-2 mb-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700 text-center">
              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold">Calories</div>
                <div className="text-lg font-black text-neutral-900 dark:text-white">{activeRecipe.calories}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Protein</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{activeRecipe.protein}g</div>
              </div>
              <div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Carbohydrates</div>
                <div className="text-lg font-black text-blue-600 dark:text-blue-400">{activeRecipe.carbs}g</div>
              </div>
              <div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Fats</div>
                <div className="text-lg font-black text-amber-600 dark:text-amber-400">{activeRecipe.fats}g</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-600" />
                Ingredients
              </h3>
              <ul className="space-y-2">
                {activeRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Step-by-Step Instructions
              </h3>
              <ol className="space-y-3">
                {activeRecipe.instructions.map((step, i) => (
                  <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
