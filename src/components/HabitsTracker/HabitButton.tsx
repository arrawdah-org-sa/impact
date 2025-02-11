import React from 'react';
import { HabitIcon } from './HabitIcon';
import { useTheme } from '../../contexts/ThemeContext';

interface HabitButtonProps {
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  progress?: number;
}

export function HabitButton({ label, onClick, isSelected, progress = 0 }: HabitButtonProps) {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 px-6 py-3 rounded-lg shadow-md 
                 transform transition-all duration-300 relative overflow-hidden
                 ${isSelected 
                   ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white scale-105'
                   : isDark
                     ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                     : 'bg-white text-gray-700 hover:scale-105 hover:shadow-lg'
                 }
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
                 animate-bounce-in`}
    >
      <HabitIcon 
        habitName={label} 
        className={`w-5 h-5 ${isSelected ? 'text-white' : isDark ? 'text-primary-400' : 'text-primary-500'}`} 
      />
      <span>{label}</span>
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300"
             style={{ width: `${progress}%` }} />
      )}
    </button>
  );
}