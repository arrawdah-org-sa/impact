export interface Note {
  content: string;
  date: Date;
}

export interface HabitData {
  weeks: boolean[][];
  steps: string;
  notes: Note[];
  streak: number;
  progress: number;
}

export interface HabitStats {
  progress: number;
  streak: number;
  totalNotes: number;
  lastUpdated?: Date;
}