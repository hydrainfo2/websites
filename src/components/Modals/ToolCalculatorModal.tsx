import React, { useState } from 'react';
import {
  X,
  Scale,
  Flame,
  Droplet,
  PieChart,
  Dumbbell,
  Droplets,
  Calculator,
} from 'lucide-react';
import { ToolType } from '../../types';

interface ToolCalculatorModalProps {
  toolType: ToolType;
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolType) => void;
}

export const ToolCalculatorModal: React.FC<ToolCalculatorModalProps> = ({
  toolType,
  isOpen,
  onClose,
  onSelectTool,
}) => {
  if (!isOpen) return null;

  // State for BMI
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);

  // State for Calories
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // Moderate
  const [calorieGoal, setCalorieGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');

  // State for 1RM
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [liftReps, setLiftReps] = useState<number>(5);

  // Calculations
  // BMI
  const heightM = heightCm / 100;
  const bmiValue = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-amber-600' };
    if (bmi < 25) return { label: 'Normal Weight', color: 'text-emerald-600' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  // Calories (Mifflin-St Jeor)
  const bmr =
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = Math.round(bmr * activity);
  const targetCalories =
    calorieGoal === 'lose' ? tdee - 450 : calorieGoal === 'gain' ? tdee + 350 : tdee;

  // Protein (1.8g - 2.2g per kg for lifting)
  const targetProteinGrams = Math.round(weightKg * 2.0);

  // Macros (40% carbs, 30% protein, 30% fats for fitness)
  const macroProteinKcal = targetCalories * 0.3;
  const macroCarbKcal = targetCalories * 0.45;
  const macroFatKcal = targetCalories * 0.25;
  const macroProteinGrams = Math.round(macroProteinKcal / 4);
  const macroCarbGrams = Math.round(macroCarbKcal / 4);
  const macroFatGrams = Math.round(macroFatKcal / 9);

  // 1RM (Epley formula: weight * (1 + reps / 30))
  const oneRepMax = Math.round(liftWeight * (1 + liftReps / 30));

  // Water (35ml per kg + 500ml for exercise)
  const waterLiters = ((weightKg * 35 + 500) / 1000).toFixed(1);

  const toolsList: { id: ToolType; label: string; icon: React.ReactNode }[] = [
    { id: 'bmi', label: 'BMI', icon: <Scale className="w-4 h-4" /> },
    { id: 'calorie', label: 'Calories', icon: <Flame className="w-4 h-4" /> },
    { id: 'protein', label: 'Protein', icon: <Droplet className="w-4 h-4" /> },
    { id: 'macro', label: 'Macros', icon: <PieChart className="w-4 h-4" /> },
    { id: '1rm', label: '1RM', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'water', label: 'Water', icon: <Droplets className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-neutral-900 dark:text-white">
                Free Fitness Calculator
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Accurate science-backed calculation tools
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tool Selector Tabs */}
        <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
          {toolsList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTool(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                toolType === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tool Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. BMI CALCULATOR */}
          {toolType === 'bmi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Weight: {weightKg} kg ({Math.round(weightKg * 2.204)} lbs)
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Height: {heightCm} cm ({Math.floor(heightCm / 30.48)}'
                    {Math.round((heightCm % 30.48) / 2.54)}")
                  </label>
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* BMI Output Card */}
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400">
                  Your Body Mass Index
                </span>
                <div className="text-4xl font-black text-neutral-900 dark:text-white my-1">
                  {bmiValue}
                </div>
                <div
                  className={`text-sm font-bold ${
                    getBmiCategory(bmiValue).color
                  }`}
                >
                  {getBmiCategory(bmiValue).label}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 max-w-sm mx-auto">
                  Healthy standard BMI ranges between 18.5 and 24.9. Note that muscular
                  strength trainees often carry healthy high BMI values due to muscle mass.
                </p>
              </div>
            </div>
          )}

          {/* 2. CALORIE CALCULATOR */}
          {toolType === 'calorie' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full mt-1 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    Goal
                  </label>
                  <select
                    value={calorieGoal}
                    onChange={(e) => setCalorieGoal(e.target.value as any)}
                    className="w-full mt-1 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-semibold text-emerald-700 dark:text-emerald-400"
                  >
                    <option value="lose">Fat Loss (-450 kcal)</option>
                    <option value="maintain">Maintain</option>
                    <option value="gain">Muscle Gain (+350 kcal)</option>
                  </select>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                  Weekly Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                >
                  <option value={1.2}>Sedentary (desk job, little exercise)</option>
                  <option value={1.375}>Lightly active (train 1-3 days/week)</option>
                  <option value={1.55}>Moderately active (train 3-5 days/week)</option>
                  <option value={1.725}>Very active (hard exercise 6-7 days/week)</option>
                </select>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center">
                  <span className="text-xs font-bold text-neutral-500">
                    Maintenance (TDEE)
                  </span>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                    {tdee} kcal
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                    Target Daily Calories
                  </span>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                    {targetCalories} kcal
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PROTEIN CALCULATOR */}
          {toolType === 'protein' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                  Body Weight: {weightKg} kg ({Math.round(weightKg * 2.204)} lbs)
                </label>
                <input
                  type="range"
                  min="45"
                  max="140"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 dark:text-emerald-300">
                  Recommended Daily Protein Target
                </span>
                <div className="text-4xl font-black text-emerald-700 dark:text-emerald-400 my-1">
                  {targetProteinGrams} grams / day
                </div>
                <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-2">
                  Approximately {Math.round(targetProteinGrams / 4)}g protein across 4 meals
                </div>
              </div>
            </div>
          )}

          {/* 4. MACRO CALCULATOR */}
          {toolType === 'macro' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                  Daily Caloric Target: {targetCalories} kcal
                </div>
                <div className="text-xs text-neutral-500">
                  Balanced athletic 45% Carbs / 30% Protein / 25% Fat distribution
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">
                    Carbohydrates
                  </div>
                  <div className="text-2xl font-black text-blue-900 dark:text-blue-200 mt-1">
                    {macroCarbGrams}g
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                    {macroCarbKcal} kcal
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    Protein
                  </div>
                  <div className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1">
                    {macroProteinGrams}g
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {macroProteinKcal} kcal
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">
                    Fats
                  </div>
                  <div className="text-2xl font-black text-amber-900 dark:text-amber-200 mt-1">
                    {macroFatGrams}g
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                    {macroFatKcal} kcal
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. 1RM CALCULATOR */}
          {toolType === '1rm' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Weight Lifted (kg or lbs)
                  </label>
                  <input
                    type="number"
                    value={liftWeight}
                    onChange={(e) => setLiftWeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Reps Completed (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={liftReps}
                    onChange={(e) => setLiftReps(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-bold"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 text-white text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Estimated 1-Rep Max (1RM)
                </span>
                <div className="text-4xl font-black my-1 text-white">
                  {oneRepMax}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-400">90% (3-4 reps)</span>
                    <p className="font-bold text-white">{Math.round(oneRepMax * 0.9)}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">80% (6-8 reps)</span>
                    <p className="font-bold text-white">{Math.round(oneRepMax * 0.8)}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">70% (10-12 reps)</span>
                    <p className="font-bold text-white">{Math.round(oneRepMax * 0.7)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. WATER INTAKE CALCULATOR */}
          {toolType === 'water' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                  Body Weight: {weightKg} kg
                </label>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="p-6 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-center">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-800 dark:text-cyan-300">
                  Daily Hydration Goal
                </span>
                <div className="text-4xl font-black text-cyan-700 dark:text-cyan-400 my-1">
                  {waterLiters} Liters / day
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                  Equivalent to ~{Math.round(Number(waterLiters) * 4)} glasses of water. Increase
                  during hot weather or intense training sessions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
