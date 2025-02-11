import { useState, useEffect } from 'react';
import * as habitsService from '../services/habits';
import type { HabitData } from '../types/habits';

export function useHabits(defaultHabits: string[]) {
  const [habits, setHabits] = useState<Record<string, HabitData>>({});
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [showNotePrompt, setShowNotePrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const habitsList = await habitsService.getHabits();
      
      const habitsRecord = habitsList.reduce((acc, habit) => {
        acc[habit.name] = habit;
        return acc;
      }, {} as Record<string, HabitData>);

      setHabits(habitsRecord);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء جلب العادات';
      setError(message);
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (name: string, description: string) => {
    try {
      setError(null);
      const newHabit = await habitsService.createHabit({
        name,
        description,
        category: 'personal'
      });

      setHabits(prev => ({
        ...prev,
        [newHabit.name]: newHabit
      }));

      setSelectedHabit(newHabit.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء إضافة العادة';
      setError(message);
      throw err;
    }
  };

  const updateHabitDay = async (weekIndex: number, dayIndex: number) => {
    if (!selectedHabit || !habits[selectedHabit]) return;

    try {
      setError(null);
      const habit = habits[selectedHabit];
      const newWeeks = habit.weeks.map((week, wIndex) => 
        wIndex === weekIndex 
          ? week.map((day, dIndex) => dIndex === dayIndex ? !day : day)
          : [...week]
      );

      const updatedHabit = await habitsService.updateHabit(habit.id, {
        weeks: newWeeks
      });

      setHabits(prev => ({
        ...prev,
        [selectedHabit]: updatedHabit
      }));

      checkForNotePrompt(newWeeks[weekIndex]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء تحديث العادة';
      setError(message);
    }
  };

  const addNote = async (content: string) => {
    if (!selectedHabit || !habits[selectedHabit]) return;

    try {
      setError(null);
      const habit = habits[selectedHabit];
      const updatedHabit = await habitsService.addNote(habit.id, content);

      setHabits(prev => ({
        ...prev,
        [selectedHabit]: updatedHabit
      }));

      setShowNotePrompt(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء إضافة الملاحظة';
      setError(message);
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
    loading,
    error,
    setSelectedHabit,
    addHabit,
    updateHabitDay,
    addNote,
    refreshHabits: loadHabits
  };
}