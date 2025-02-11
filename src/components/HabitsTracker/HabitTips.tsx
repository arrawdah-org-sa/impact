import React from 'react';
import { Lightbulb } from 'lucide-react';

interface HabitTipsProps {
  habitName: string;
  tips: string[];
}

export function HabitTips({ habitName, tips }: HabitTipsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">نصائح لتطبيق {habitName}</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-center leading-6 mr-3 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}