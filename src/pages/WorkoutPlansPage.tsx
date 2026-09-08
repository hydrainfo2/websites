import React, { useState } from 'react';
import { Calendar, Clock, Award, CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Dumbbell } from 'lucide-react';
import { WorkoutPlan } from '../types';
import { sampleWorkoutPlans } from '../data/workoutAndRecipeData';

export const WorkoutPlansPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [expandedPlanId, setExpandedPlanId] = useState<string>('plan-full-body-3x');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPlans = sampleWorkoutPlans.filter((plan) => {
    if (selectedLevel === 'All') return true;
    return plan.level === selectedLevel;
  });

  const handleCopyPlan = (plan: WorkoutPlan) => {
    let text = `${plan.title} (${plan.level})\nFrequency: ${plan.frequency} | Duration: ${plan.duration}\n\n`;
    plan.days.forEach((day) => {
      text += `[${day.dayName} - ${day.focus}]\n`;
      day.exercises.forEach((ex) => {
        text += `- ${ex.name}: ${ex.sets} sets x ${ex.reps} (Rest: ${ex.rest})\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text);
    setCopiedId(plan.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Page Header */}
      <div className="rounded-2xl bg-gradient-to-r from-neutral-900 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden border border-neutral-800">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Structured Periodization
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Proven Workout Splits & Routines
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Stop guessing your sets and reps. Choose a research-backed training split tailored to your recovery capacity, schedule, and experience level.
          </p>
        </div>
      </div>

      {/* Level Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all cursor-pointer ${
              selectedLevel === lvl
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800'
            }`}
          >
            {lvl === 'All' ? 'All Workout Splits' : `${lvl} Trainees`}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="space-y-6">
        {filteredPlans.map((plan) => {
          const isExpanded = expandedPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs transition-all"
            >
              {/* Header Bar */}
              <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        plan.level === 'Beginner'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : plan.level === 'Intermediate'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      }`}
                    >
                      {plan.level}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {plan.frequency} • {plan.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                    {plan.title}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyPlan(plan)}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                    title="Copy full routine text"
                  >
                    {copiedId === plan.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Split</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setExpandedPlanId(isExpanded ? '' : plan.id)
                    }
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{isExpanded ? 'Hide Routine' : 'View Full Routine'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Exercise Breakdown */}
              {isExpanded && (
                <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                    {plan.days.map((day, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 shadow-xs flex flex-col"
                      >
                        <div className="mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                          <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                            {day.dayName}
                          </h3>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                            {day.focus}
                          </div>
                        </div>

                        <div className="space-y-3 flex-1">
                          {day.exercises.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="text-xs p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800"
                            >
                              <div className="font-bold text-neutral-900 dark:text-white">
                                {ex.name}
                              </div>
                              <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mt-1">
                                <span>
                                  {ex.sets} sets × {ex.reps} reps
                                </span>
                                <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                                  Rest: {ex.rest}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
