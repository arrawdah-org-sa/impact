import React from 'react';
import { Check, X } from 'lucide-react';

interface HabitTrackingTableProps {
  days: boolean[];
  onToggleDay: (index: number) => void;
}

export function HabitTrackingTable({ days, onToggleDay }: HabitTrackingTableProps) {
  const weekDays = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">متابعة العادة</h4>
      
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-sm text-gray-600 mb-2">{day}</div>
            <button
              onClick={() => onToggleDay(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                       ${days[index] 
                         ? 'bg-green-500 text-white' 
                         : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            >
              {days[index] ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}