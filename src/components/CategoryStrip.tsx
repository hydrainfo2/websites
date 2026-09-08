import React from 'react';
import {
  LayoutGrid,
  Dumbbell,
  Flame,
  Apple,
  Activity,
  Moon,
  Home,
  Footprints,
  BicepsFlexed,
} from 'lucide-react';
import { CategoryId, CategoryItem } from '../types';

interface CategoryStripProps {
  categories: CategoryItem[];
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
      isActive ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
    }`;

    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className={iconClass} />;
      case 'Dumbbell':
        return <Dumbbell className={iconClass} />;
      case 'BicepsFlexed':
        return <BicepsFlexed className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Apple':
        return <Apple className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Home':
        return <Home className={iconClass} />;
      case 'Footprints':
        return <Footprints className={iconClass} />;
      default:
        return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <div className="w-full mb-10 sm:mb-12">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-2.5 sm:py-4 sm:px-6 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[760px] gap-2 lg:gap-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                id={`category-pill-${cat.id}`}
                className="group flex flex-col items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all cursor-pointer flex-1"
              >
                {/* Circular Icon Container */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-[#064e3b] dark:bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-200/80 dark:group-hover:bg-neutral-700'
                  }`}
                >
                  {getIcon(cat.iconName, isActive)}
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs sm:text-[13px] whitespace-nowrap font-medium transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
