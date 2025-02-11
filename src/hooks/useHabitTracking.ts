import { useState, useEffect } from 'react';
import type { Habit, HabitStats } from '../types/habit';

export function useHabitTracking() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'progress' | 'streak' | 'logs'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      progress: 0,
      streak: 0,
      logs: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const logProgress = (habitId: string, adherenceLevel: number, notes?: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== habitId) return habit;

      const newLog = {
        date: new Date(),
        completed: adherenceLevel >= 50,
        adherenceLevel,
        notes
      };

      const updatedHabit = {
        ...habit,
        logs: [...habit.logs, newLog]
      };

      // Calculate new progress and streak
      const recentLogs = updatedHabit.logs.slice(-30);
      const completedLogs = recentLogs.filter(log => log.completed);
      const progress = (completedLogs.length / recentLogs.length) * 100;

      let streak = 0;
      for (let i = updatedHabit.logs.length - 1; i >= 0; i--) {
        if (updatedHabit.logs[i].completed) streak++;
        else break;
      }

      return {
        ...updatedHabit,
        progress,
        streak
      };
    }));
  };

  const getHabitStats = (habitId: string): HabitStats => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) throw new Error('Habit not found');

    const completedLogs = habit.logs.filter(log => log.completed);
    const overallAdherence = (completedLogs.length / habit.logs.length) * 100 || 0;

    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    habit.logs.forEach(log => {
      if (log.completed) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    currentStreak = habit.streak;

    const challenges = [
      'تحسين الالتزام في أوقات الضغط',
      'الحفاظ على التركيز والدافعية',
      'تنظيم الوقت بشكل أفضل'
    ];

    const recommendations = [
      'حدد وقتاً ثابتاً للعادة',
      'اربط العادة بنشاط يومي',
      'احتفل بالإنجازات الصغيرة',
      'راجع أهدافك بشكل دوري'
    ];

    return {
      overallAdherence,
      currentStreak,
      longestStreak,
      challenges,
      recommendations
    };
  };

  return {
    habits,
    addHabit,
    logProgress,
    getHabitStats
  };
}