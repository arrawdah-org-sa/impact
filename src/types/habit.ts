export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime?: string;
  goal: string;
  progress: number;
  streak: number;
  startDate: Date;
  logs: HabitLog[];
}

export interface HabitLog {
  date: Date;
  completed: boolean;
  adherenceLevel: number;
  notes?: string;
}

export interface HabitStats {
  overallAdherence: number;
  currentStreak: number;
  longestStreak: number;
  challenges: string[];
  recommendations: string[];
}