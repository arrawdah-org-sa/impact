import { useState, useEffect } from 'react';
import { calculateProgress, calculateStreak } from '../utils/habitCalculations';
import { initializeHabit, createHabitData } from '../utils/habitHelpers';
import type { HabitData } from '../types/habits';
import type { HabitRepository } from '../repositories/HabitRepository';

export function useHabits(
  repository: HabitRepository,
  defaultHabits: string[]
) {
  const [habits, setHabits] = useState<Record<string, HabitData>>({});
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [showNotePrompt, setShowNotePrompt] = useState(false);

  // Load habits from repository on mount
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const savedHabits = await repository.getHabits();
        const initialHabits = initializeHabit(savedHabits, defaultHabits);
        setHabits(initialHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
        // Initialize with default habits if loading fails
        const initialHabits = initializeHabit({}, defaultHabits);
        setHabits(initialHabits);
      }
    };

    loadHabits();
  }, [repository, defaultHabits]);

  const addHabit = async (habitName: string, steps: string) => {
    try {
      const newHabit = createHabitData(steps);

      setHabits(prev => ({
        ...prev,
        [habitName]: newHabit
      }));
      
      await repository.updateHabit(habitName, newHabit);
      setSelectedHabit(habitName);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const updateHabitDay = async (weekIndex: number, dayIndex: number) => {
    if (!selectedHabit) return;

    try {
      const updatedHabit = { ...habits[selectedHabit] };
      const newWeeks = updatedHabit.weeks.map((week, wIndex) => 
        wIndex === weekIndex 
          ? week.map((day, dIndex) => dIndex === dayIndex ? !day : day)
          : [...week]
      );

      updatedHabit.weeks = newWeeks;
      updatedHabit.progress = calculateProgress(newWeeks);
      updatedHabit.streak = calculateStreak(newWeeks);

      setHabits(prev => ({
        ...prev,
        [selectedHabit]: updatedHabit
      }));

      await repository.updateHabit(selectedHabit, updatedHabit);
      checkForNotePrompt(newWeeks[weekIndex]);
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const addNote = async (note: string) => {
    if (!selectedHabit) return;

    try {
      const updatedHabit = {
        ...habits[selectedHabit],
        notes: [
          ...habits[selectedHabit].notes,
          { content: note, date: new Date() }
        ]
      };

      setHabits(prev => ({
        ...prev,
        [selectedHabit]: updatedHabit
      }));

      await repository.updateHabit(selectedHabit, updatedHabit);
      setShowNotePrompt(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const checkForNotePrompt = (week: boolean[]) => {
    const completedDays = week.filter(day => day).length;
    setShowNotePrompt(completedDays === 7);
  };

  return {
    habits,
    selectedHabit,
    showNotePrompt,
    setSelectedHabit,
    addHabit,
    updateHabitDay,
    addNote
  };
}