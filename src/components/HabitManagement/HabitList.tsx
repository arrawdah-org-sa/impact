import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Habit {
  name: string;
  description: string;
  progress: number;
}

interface HabitListProps {
  habits: Habit[];
  onSelect: (habit: string) => void;
  selectedHabit: string | null;
}

export function HabitList({ habits, onSelect, selectedHabit }: HabitListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {habits.map((habit) => (
        <button
          key={habit.name}
          onClick={() => onSelect(habit.name)}
          className={`text-right p-4 rounded-xl transition-all
                     ${selectedHabit === habit.name
                       ? 'bg-primary-50 border-2 border-primary-500'
                       : 'bg-white border border-gray-200 hover:border-primary-300'}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <CheckCircle className={`w-5 h-5 ${
                habit.progress === 100 ? 'text-green-500' : 'text-gray-400'
              }`} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{habit.name}</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{habit.description}</p>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-primary-600">
                  {habit.progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100">
              <div
                style={{ width: `${habit.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
              />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}