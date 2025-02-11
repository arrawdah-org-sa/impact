import React from 'react';
import { BarChart, Trophy, AlertTriangle, Lightbulb } from 'lucide-react';
import type { HabitStats } from '../../types/habit';

interface HabitReportProps {
  stats: HabitStats;
}

export function HabitReport({ stats }: HabitReportProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">تقرير الأداء</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-primary-600" />
            <h4 className="font-semibold text-gray-900">الإنجازات</h4>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">نسبة الالتزام الإجمالية: {stats.overallAdherence}%</p>
            <p className="text-gray-600">أيام النجاح المتتالية: {stats.currentStreak}</p>
            <p className="text-gray-600">أطول سلسلة نجاح: {stats.longestStreak}</p>
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-gray-900">التحديات</h4>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {stats.challenges.map((challenge, index) => (
              <li key={index} className="text-gray-600">{challenge}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-gray-900">توصيات للتحسين</h4>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {stats.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-600">{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}