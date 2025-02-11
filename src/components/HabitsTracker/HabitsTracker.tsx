import React, { useState } from 'react';
import { HabitButton } from './HabitButton';
import { HabitForm } from './HabitForm';
import { WeekTable } from './WeekTable';
import { WeekProgress } from './WeekProgress';
import { HabitNote } from './HabitNote';
import { HabitProgress } from './HabitProgress';
import { HabitTips } from './HabitTips';
import type { HabitData } from '../../types/habits';

interface HabitsTrackerProps {
  title: string;
  defaultHabits: string[];
  habitTips: Record<string, string[]>;
  selectedHabit: string | null;
  habits: Record<string, HabitData>;
  showNotePrompt: boolean;
  onHabitSelect: (habit: string) => void;
  onHabitAdd: (habit: string, steps: string) => void;
  onDayUpdate: (weekIndex: number, dayIndex: number) => void;
  onNoteAdd: (note: string) => void;
}

export function HabitsTracker({
  title,
  defaultHabits,
  habitTips,
  selectedHabit,
  habits,
  showNotePrompt,
  onHabitSelect,
  onHabitAdd,
  onDayUpdate,
  onNoteAdd
}: HabitsTrackerProps) {
  const [showForm, setShowForm] = useState(false);

  const handleHabitAdd = (habit: string, steps: string) => {
    onHabitAdd(habit, steps);
    setShowForm(false);
  };

  const calculateWeekProgress = (weekData: boolean[]): number => {
    const completedDays = weekData.filter(day => day).length;
    return Number(((completedDays / 7) * 100).toFixed(1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {Object.entries(habits).map(([habit, data]) => (
          <HabitButton
            key={habit}
            label={habit}
            isSelected={selectedHabit === habit}
            progress={data.progress}
            onClick={() => onHabitSelect(habit)}
          />
        ))}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                   bg-primary-100 text-primary-600 hover:bg-primary-200 
                   transition-all duration-300"
        >
          <span>إضافة عادة</span>
        </button>
      </div>

      {showForm && (
        <HabitForm onSubmit={handleHabitAdd} />
      )}

      {selectedHabit && habits[selectedHabit] && (
        <div className="space-y-6">
          <HabitProgress
            progress={habits[selectedHabit].progress}
            streak={habits[selectedHabit].streak}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((week) => (
              <div key={week}>
                <WeekTable
                  week={week + 1}
                  onCheck={(dayIndex) => onDayUpdate(week, dayIndex)}
                  checkedDays={habits[selectedHabit].weeks[week]}
                />
                <WeekProgress
                  week={week + 1}
                  progress={calculateWeekProgress(habits[selectedHabit].weeks[week])}
                />
              </div>
            ))}
          </div>

          {habitTips[selectedHabit] && (
            <HabitTips
              habitName={selectedHabit}
              tips={habitTips[selectedHabit]}
            />
          )}

          {showNotePrompt && (
            <HabitNote onSubmit={onNoteAdd} />
          )}
        </div>
      )}
    </div>
  );
}