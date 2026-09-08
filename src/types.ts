export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Training' | 'Strength' | 'Nutrition' | 'Wellness' | 'Muscle Building' | 'Fat Loss' | 'Mobility' | 'Recovery' | 'Home Workouts' | 'Running';
  tagColor?: string;
  readTime: string;
  date: string;
  coverImage: string;
  excerpt: string;
  featured?: boolean;
  popular?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bulletPoints?: string[];
      tip?: string;
    }[];
    takeaways: string[];
    author: {
      name: string;
      role: string;
      avatar: string;
    };
  };
}

export type CategoryId =
  | 'all'
  | 'strength'
  | 'muscle-building'
  | 'fat-loss'
  | 'nutrition'
  | 'mobility'
  | 'recovery'
  | 'home-workouts'
  | 'running';

export interface CategoryItem {
  id: CategoryId;
  label: string;
  iconName: string;
}

export type ToolType =
  | 'bmi'
  | 'calorie'
  | 'protein'
  | 'macro'
  | '1rm'
  | 'water';

export interface FitnessTool {
  id: ToolType;
  name: string;
  description: string;
  iconName: string;
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  targetMuscle: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  frequency: string;
  duration: string;
  goal: string;
  description: string;
  days: WorkoutDay[];
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  servings: number;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

