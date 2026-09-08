import React, { useEffect, useState } from 'react';
import { ArrowUp, Database, Server } from 'lucide-react';
import { fetchHealthStatus, HealthStatus } from '../api';

interface FooterProps {
  onSelectCategory: (catId: any) => void;
  onOpenTool: (tool: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTool,
}) => {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    fetchHealthStatus().then((h) => {
      if (h) setHealth(h);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200/90 dark:border-neutral-800 mt-20 pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-100 dark:border-neutral-800">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center">
                <svg
                  viewBox="0 0 44 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <path d="M4 36L14 4L22 22L16 36H4Z" fill="#059669" />
                  <path
                    d="M40 36L30 4L22 22L28 36H40Z"
                    fill="#1f2937"
                    className="dark:fill-emerald-400"
                  />
                  <circle cx="22" cy="11" r="3.5" fill="#10b981" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white leading-none">
                  Mukesh
                </span>
                <span className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 leading-none mt-1">
                  Fitness
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Practical training guides, science-backed fitness advice, and simple
              sustainable strategies to help you become stronger, healthier, and
              more athletic.
            </p>

            <div className="text-xs text-neutral-400 dark:text-neutral-500">
              Disclaimer: Content published on Mukesh Fitness is strictly for
              educational purposes and should not replace professional medical advice.
            </div>
          </div>

          {/* Col 2: Topics */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
              Explore Topics
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => onSelectCategory('strength')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Strength Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('muscle-building')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Hypertrophy & Muscle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('nutrition')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Nutrition & Diet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fat-loss')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Fat Loss Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('recovery')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Sleep & Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Calculators */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
              Fitness Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => onOpenTool('bmi')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  BMI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('calorie')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  TDEE & Calorie Needs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('protein')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Protein Target Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('1rm')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  One-Rep Max (1RM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTool('water')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Hydration Calculator
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & backend badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Mukesh Fitness. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
              <Server className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Node.js Backend</span>
              <span>•</span>
              <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{health?.mongoConnected ? 'MongoDB Live' : 'MongoDB Ready'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer">
              Terms of Service
            </span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
