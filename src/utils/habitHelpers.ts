import type { HabitData } from '../types/habits';

export function createHabitData(steps: string = ''): HabitData {
  return {
    weeks: Array(4).fill(null).map(() => Array(7).fill(false)),
    steps,
    notes: [],
    streak: 0,
    progress: 0
  };
}

export function initializeHabit(
  savedHabits: Record<string, HabitData>,
  defaultHabits: string[]
): Record<string, HabitData> {
  const initialHabits: Record<string, HabitData> = {};
  
  defaultHabits.forEach(habit => {
    if (savedHabits[habit]) {
      // Create deep copy of saved habit data
      initialHabits[habit] = {
        ...savedHabits[habit],
        weeks: savedHabits[habit].weeks.map(week => [...week])
      };
    } else {
      // Create new habit data
      initialHabits[habit] = createHabitData();
    }
  });

  return initialHabits;
}