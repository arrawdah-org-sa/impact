import React from 'react';
import { Trophy, Calendar, Target } from 'lucide-react';

interface HabitStatsProps {
  progress: number;
  streak: number;
  totalDays: number;
}

export function HabitStats({ progress, streak, totalDays }: HabitStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="p-3 bg-primary-100 rounded-full mr-4">
          <Target className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">نسبة الإنجاز</h3>
          <p className="text-2xl font-bold text-primary-600">{progress}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="p-3 bg-yellow-100 rounded-full mr-4">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">أيام متتالية</h3>
          <p className="text-2xl font-bold text-yellow-600">{streak} يوم</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="p-3 bg-green-100 rounded-full mr-4">
          <Calendar className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">مجموع الأيام</h3>
          <p className="text-2xl font-bold text-green-600">{totalDays} يوم</p>
        </div>
      </div>
    </div>
  );
}