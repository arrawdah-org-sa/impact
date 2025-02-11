export interface Note {
  content: string;
  date: Date;
}

export interface HabitData {
  id: string;
  name: string;
  description?: string;
  category: 'spiritual' | 'social' | 'personal' | 'educational';
  progress: number;
  streak: number;
  weeks: boolean[][];
  notes: Note[];
  isActive: boolean;
  startDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface HabitStats {
  completedDays: number;
  totalDays: number;
  completionRate: number;
  streak: number;
  startDate: Date;
  notesCount: number;
}