import React from 'react';

interface WeekProgressProps {
  week: number;
  progress: number;
}

export function WeekProgress({ week, progress }: WeekProgressProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">تقدم الأسبوع {week}</span>
        <span className="text-sm font-medium text-primary-600">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}