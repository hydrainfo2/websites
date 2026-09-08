import { Article, CategoryItem, FitnessTool } from '../types';

export const categories: CategoryItem[] = [
  { id: 'all', label: 'All', iconName: 'LayoutGrid' },
  { id: 'strength', label: 'Strength', iconName: 'Dumbbell' },
  { id: 'muscle-building', label: 'Muscle Building', iconName: 'BicepsFlexed' },
  { id: 'fat-loss', label: 'Fat Loss', iconName: 'Flame' },
  { id: 'nutrition', label: 'Nutrition', iconName: 'Apple' },
  { id: 'mobility', label: 'Mobility', iconName: 'Activity' },
  { id: 'recovery', label: 'Recovery', iconName: 'Moon' },
  { id: 'home-workouts', label: 'Home Workouts', iconName: 'Home' },
  { id: 'running', label: 'Running', iconName: 'Footprints' },
];

export const articles: Article[] = [
  {
    id: 'hero-article',
    title: 'Build a Stronger Body Without Wasting Your Time',
    slug: 'build-stronger-body-without-wasting-time',
    category: 'Training',
    readTime: '8 min read',
    date: 'Updated Sep 2026',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1400&auto=format&fit=crop',
    excerpt: 'Practical training guides, science-backed fitness advice, and simple strategies to help you become stronger and healthier.',
    featured: false,
    content: {
      intro: 'Most people spend hours in the gym doing endless sets of redundant exercises, chasing muscle soreness rather than measurable progression. Building an athletic, resilient physique does not require 6 days a week or 2-hour grinds.',
      sections: [
        {
          heading: '1. The 80/20 Rule of Strength Training',
          body: 'Eighty percent of your physical gains will stem from mastering 4 to 5 fundamental compound movement patterns: the squat, hinge, horizontal push/pull, and vertical push/pull.',
          bulletPoints: [
            'Squat pattern (Barbell Back Squat, Goblet Squat)',
            'Hinge pattern (Romanian Deadlift, Barbell Deadlift)',
            'Push pattern (Overhead Press, Dumbbell Bench Press)',
            'Pull pattern (Pull-ups, Chest-Supported Rows)',
          ],
          tip: 'Track your working sets in a simple journal. If you lifted 185 lbs for 6 reps last week, aim for 7 reps today.'
        },
        {
          heading: '2. Managing Fatigue and Volume',
          body: 'More volume is only better if you can recover from it. For natural lifters, 10 to 18 hard working sets per muscle group weekly produces peak hypertrophy without systemic breakdown.',
        }
      ],
      takeaways: [
        'Prioritize compound lifts before accessory isolation movements.',
        'Keep working sets between 1-3 reps in reserve (RIR).',
        'Consistency over 12 months beats intensity over 3 weeks.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'featured-main',
    title: 'The Complete Beginner’s Guide to Strength Training',
    slug: 'complete-beginners-guide-strength-training',
    category: 'Training',
    readTime: '10 min read',
    date: 'Sep 2026',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Learn the fundamentals of strength training, including exercises, sets, reps, progressive overload, and recovery.',
    featured: true,
    content: {
      intro: 'Stepping into a free weights room can be intimidating. This comprehensive guide strips away the industry myths and gives you a rock-solid, step-by-step foundation to build raw strength safely.',
      sections: [
        {
          heading: 'What is Progressive Overload?',
          body: 'Progressive overload is the gradual increase of stress placed upon the musculoskeletal and nervous system. Your body will only adapt and build new muscle tissue when forced to handle loads it is not currently accustomed to.',
          bulletPoints: [
            'Increasing resistance (adding weight to the barbell or dumbbells)',
            'Increasing repetitions with the identical weight',
            'Improving technical execution and range of motion',
            'Decreasing rest intervals while maintaining mechanical performance'
          ]
        },
        {
          heading: 'The 3-Day Full Body Blueprint',
          body: 'For the first 6-12 months of lifting, a 3-day full body split (Monday / Wednesday / Friday) allows high training frequency per muscle group with optimal 48-hour recovery windows.',
          tip: 'Always warm up dynamically with light bodyweight drills and 2-3 progressive warm-up sets with the empty bar before hitting working weights.'
        }
      ],
      takeaways: [
        'Focus on perfect movement mechanics before chasing heavy weights.',
        'Compound multi-joint exercises build the most muscle per minute.',
        'Sleep 7-9 hours per night; muscle synthesis happens at rest.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'stacked-1',
    title: 'How to Build Your First Workout Routine',
    slug: 'how-to-build-first-workout-routine',
    category: 'Training',
    readTime: '6 min read',
    date: 'Jun 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    excerpt: 'A no-nonsense blueprint to construct an efficient weekly workout split tailored to your exact lifestyle and available gym equipment.',
    featured: true,
    content: {
      intro: 'The best workout program is not the one copied from an elite bodybuilder; it is the one you can stick to consistently around your work, family, and energy levels.',
      sections: [
        {
          heading: 'Step 1: Choose Your Weekly Frequency',
          body: 'Be realistic. If you can only reliably hit the gym 3 days a week, a 6-day Push-Pull-Legs split will lead to skipped sessions and guilt. Full body 3x/week or Upper/Lower 4x/week are superior for 90% of trainees.'
        },
        {
          heading: 'Step 2: Balance Push and Pull Volumes',
          body: 'For every pressing exercise (bench press, shoulder press), ensure you program an equivalent pulling movement (rows, chin-ups, face pulls) to protect shoulder joint integrity.'
        }
      ],
      takeaways: [
        'Match program frequency to your genuine calendar availability.',
        'Include at least 1 horizontal pull and 1 vertical pull every week.',
        'Stick with your routine for at least 8 to 12 weeks before changing variables.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'stacked-2',
    title: 'How Much Protein Do You Actually Need?',
    slug: 'how-much-protein-do-you-actually-need',
    category: 'Nutrition',
    readTime: '5 min read',
    date: 'Jun 10, 2026',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Cutting through supplement marketing to discover evidence-based daily protein targets for muscle growth, fat loss, and longevity.',
    featured: true,
    content: {
      intro: 'Protein is the primary macronutrient responsible for repairing skeletal muscle tissue and synthesising enzymes. But how much do you truly need to consume each day?',
      sections: [
        {
          heading: 'The Scientific Consensus',
          body: 'Meta-analyses reviewing hundreds of clinical resistance-training trials show that protein intakes between 1.6 to 2.2 grams per kilogram of body weight (0.7 to 1.0 grams per pound) optimize muscle protein synthesis.'
        },
        {
          heading: 'Timing and Distribution',
          body: 'Distributing protein evenly across 3 to 4 meals (approximately 25-40g per meal) maintains a steady elevation of blood leucine levels, maximizing the anabolic response throughout the day.'
        }
      ],
      takeaways: [
        'Aim for 0.8–1.0 grams per pound of goal bodyweight.',
        'Prioritize whole food sources: eggs, chicken, fish, greek yogurt, tofu, and legumes.',
        'Protein powder is a convenient supplement, not a mandatory requirement.'
      ],
      author: {
        name: 'Dr. Elena Rostova',
        role: 'Sports Nutritionist & RD',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'stacked-3',
    title: 'Training Hard vs Training Smart',
    slug: 'training-hard-vs-training-smart',
    category: 'Wellness',
    readTime: '7 min read',
    date: 'Jun 8, 2026',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Why grinding yourself into total exhaustion every session is slowing your progress, and how smart autoregulation unlocks lifelong gains.',
    featured: true,
    content: {
      intro: 'Gym culture often glorifies vomiting into trash cans and crawling out of the weight room. But excessive muscle damage and chronic central nervous system exhaustion directly hinder hypertrophy and elevate injury risks.',
      sections: [
        {
          heading: 'Stimulating Reps vs Junk Volume',
          body: 'Only the last 3-4 repetitions of a challenging set (taken near muscular failure) drive the majority of mechanical tension. Doing 20 sloppy sets when 8 precise sets with proper rest would suffice is counterproductive.'
        },
        {
          heading: 'Recognizing Signs of Overreaching',
          body: 'If your resting heart rate elevates, sleep quality drops, and weights feel noticeably heavier week after week, your body is begging for a deload week.'
        }
      ],
      takeaways: [
        'End sets with 1 to 2 reps in reserve for long-term longevity.',
        'Prioritize joint health: pain is a warning signal, not a badge of honor.',
        'Incorporate active recovery, walking, and mobility work.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'popular-1',
    title: '5 Push-Up Variations That Actually Build Strength',
    slug: '5-push-up-variations-that-actually-build-strength',
    category: 'Strength',
    readTime: '5 min read',
    date: 'May 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Move beyond high-rep basic push-ups with these progressive variations that challenge your chest, triceps, and core.',
    popular: true,
    content: {
      intro: 'When standard push-ups become too easy, doing 50 reps builds endurance rather than strength. Here are 5 biomechanically superior variations to pack on upper-body power.',
      sections: [
        {
          heading: '1. Deficit Push-Ups',
          body: 'Place hands on elevation blocks or dumbbells to allow your chest to sink 2-3 inches deeper, dramatically increasing the stretch on the pectoralis major.'
        },
        {
          heading: '2. Archer Push-Ups',
          body: 'A stepping stone to the one-arm push-up, shifting 80% of your bodyweight onto a single working arm while the other stays straight.'
        }
      ],
      takeaways: [
        'Increase mechanical leverage or range of motion instead of just adding reps.',
        'Keep core braced and hips aligned with shoulders throughout.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'popular-2',
    title: 'High-Protein Foods for Every Diet',
    slug: 'high-protein-foods-for-every-diet',
    category: 'Nutrition',
    readTime: '6 min read',
    date: 'May 25, 2026',
    coverImage: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop',
    excerpt: 'A comprehensive grocery guide featuring the highest protein-to-calorie food choices for omnivores, pescatarians, and plant-based athletes.',
    popular: true,
    content: {
      intro: 'Hitting 150g+ of protein daily without blowing your calorie budget requires selecting foods with high protein density.',
      sections: [
        {
          heading: 'Top Tier Lean Proteins',
          body: 'Chicken breast, turkey, cod, egg whites, and non-fat Greek yogurt boast over 80% of their total caloric value strictly from protein.'
        },
        {
          heading: 'Plant-Powered Staples',
          body: 'Tempeh, edamame, seitan, lentils, and nutritional yeast provide complete amino acid profiles while delivering beneficial micronutrients and prebiotic fiber.'
        }
      ],
      takeaways: [
        'Focus on the protein-to-calorie ratio of your food items.',
        'Keep easy protein snacks on hand like Greek yogurt or canned tuna.'
      ],
      author: {
        name: 'Dr. Elena Rostova',
        role: 'Sports Nutritionist & RD',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'
      }
    }
  },
  {
    id: 'popular-3',
    title: 'A Simple 30-Minute Full-Body Workout',
    slug: 'simple-30-minute-full-body-workout',
    category: 'Home Workouts',
    readTime: '7 min read',
    date: 'May 20, 2026',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Short on time? Use this antagonist superset structure to stimulate every major muscle group in only thirty focused minutes.',
    popular: true,
    content: {
      intro: 'When schedule constraints strike, don’t skip your workout. Antagonist supersets (pairing non-competing muscle groups like chest and back) cut gym duration in half without sacrificing intensity.',
      sections: [
        {
          heading: 'The Superset Pairing',
          body: 'Superset A: Dumbbell Goblet Squat paired immediately with Dumbbell Romanian Deadlift. Rest 90 seconds. 3 rounds total.'
        },
        {
          heading: 'Upper Body Finisher',
          body: 'Superset B: Dumbbell Overhead Press paired with Single-Arm Dumbbell Rows. Rest 60 seconds. 3 rounds total.'
        }
      ],
      takeaways: [
        'Antagonist pairings keep heart rate elevated and slash downtime.',
        'Keep warm-up efficient: 3 minutes of dynamic mobility is enough.'
      ],
      author: {
        name: 'Mukesh Kumar',
        role: 'Head Strength Coach & CSCS',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      }
    }
  }
];

export const fitnessTools: FitnessTool[] = [
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and healthy weight range',
    iconName: 'Scale'
  },
  {
    id: 'calorie',
    name: 'Calorie Calculator',
    description: 'Estimate daily maintenance calories and TDEE targets',
    iconName: 'Flame'
  },
  {
    id: 'protein',
    name: 'Protein Calculator',
    description: 'Find your optimal daily protein grams for muscle and fat loss',
    iconName: 'Droplet'
  },
  {
    id: 'macro',
    name: 'Macro Calculator',
    description: 'Break down daily carbs, protein, and fats tailored to your goal',
    iconName: 'PieChart'
  },
  {
    id: '1rm',
    name: '1RM Calculator',
    description: 'Estimate your One-Rep Max from submaximal lifts',
    iconName: 'Dumbbell'
  },
  {
    id: 'water',
    name: 'Water Intake',
    description: 'Calculate recommended hydration liters based on body weight',
    iconName: 'Droplets'
  }
];
