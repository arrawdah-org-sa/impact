import React from 'react';
import { Check } from 'lucide-react';

interface WeekTableProps {
  week: number;
  onCheck: (dayIndex: number) => void;
  checkedDays: boolean[];
}

export function WeekTable({ week, onCheck, checkedDays }: WeekTableProps) {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        الأسبوع {week}
      </h4>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-sm mb-2 text-gray-600">
              {day}
            </div>
            <button
              onClick={() => onCheck(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                       transition-all duration-300 transform hover:scale-110
                       ${checkedDays[index]
                         ? 'bg-green-500 text-white shadow-lg'
                         : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                       }`}
              aria-label={`تحديد يوم ${day}`}
            >
              <Check className={`w-5 h-5 ${checkedDays[index] ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}