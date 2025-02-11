import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { Habit } from '../../types/habit';

interface HabitProgressProps {
  habit: Habit;
  onLogProgress: (adherenceLevel: number, notes?: string) => void;
}

export function HabitProgress({ habit, onLogProgress }: HabitProgressProps) {
  const [adherenceLevel, setAdherenceLevel] = React.useState(100);
  const [notes, setNotes] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogProgress(adherenceLevel, notes);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{habit.name}</h3>
        <span className="text-sm text-gray-500">
          {habit.frequency === 'daily' ? 'يومي' : 
           habit.frequency === 'weekly' ? 'أسبوعي' : 'شهري'}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">نسبة الإنجاز</span>
          <span className="text-sm font-medium text-primary-600">{habit.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${habit.progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            مستوى الالتزام اليوم
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={adherenceLevel}
            onChange={(e) => setAdherenceLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ملاحظات (اختياري)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            rows={3}
            placeholder="أضف ملاحظاتك حول أدائك اليوم..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                   transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>تأكيد الإنجاز</span>
        </button>
      </form>

      {habit.streak > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">
            أحسنت! لديك {habit.streak} {
              habit.frequency === 'daily' ? 'يوم' : 
              habit.frequency === 'weekly' ? 'أسبوع' : 'شهر'
            } متتالي من النجاح
          </span>
        </div>
      )}
    </div>
  );
}