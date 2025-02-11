import React from 'react';
import { Trophy } from 'lucide-react';

interface HabitProgressProps {
  progress: number;
  streak: number;
}

export function HabitProgress({ progress, streak }: HabitProgressProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">التقدم الكلي</h4>
        <div className="flex items-center gap-2 text-yellow-500">
          <Trophy className="w-5 h-5" />
          <span className="font-bold">{streak} أيام متتالية</span>
        </div>
      </div>
      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400
                     transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-center font-medium text-gray-600">
        {progress}% مكتمل
      </div>
    </div>
  );
}