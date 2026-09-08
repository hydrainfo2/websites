import React from 'react';
import {
  Scale,
  Flame,
  Droplet,
  PieChart,
  Dumbbell,
  Droplets,
  ArrowRight,
} from 'lucide-react';
import { FitnessTool, ToolType } from '../types';

interface FitnessToolsProps {
  tools: FitnessTool[];
  onOpenTool: (toolType: ToolType) => void;
}

export const FitnessTools: React.FC<FitnessToolsProps> = ({
  tools,
  onOpenTool,
}) => {
  const getToolIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-emerald-600 dark:text-emerald-400';

    switch (iconName) {
      case 'Scale':
        return <Scale className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Droplet':
        return <Droplet className={iconClass} />;
      case 'PieChart':
        return <PieChart className={iconClass} />;
      case 'Dumbbell':
        return <Dumbbell className={iconClass} />;
      case 'Droplets':
        return <Droplets className={iconClass} />;
      default:
        return <Dumbbell className={iconClass} />;
    }
  };

  return (
    <section className="w-full mt-12 sm:mt-16 mb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-neutral-900 dark:text-white">
            Free Fitness Tools
          </h2>
          <div className="h-1 w-10 bg-emerald-600 rounded-full mt-2" />
        </div>

        <button
          onClick={() => onOpenTool('bmi')}
          id="tools-view-all-btn"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <span>View All Tools</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Responsive Horizontal / Grid Layout matching image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onOpenTool(tool.id)}
            id={`tool-card-${tool.id}`}
            className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70 hover:shadow-md transition-all duration-200 text-left cursor-pointer"
          >
            {/* Icon Box */}
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {getToolIcon(tool.iconName)}
            </div>

            {/* Label */}
            <div className="min-w-0">
              <span className="text-xs sm:text-[13px] font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block truncate">
                {tool.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
