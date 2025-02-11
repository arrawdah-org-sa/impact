import React, { useState } from 'react';
import { Clock, Target, Plus } from 'lucide-react';
import type { Habit } from '../../types/habit';

interface AddHabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'progress' | 'streak' | 'logs'>) => void;
}

export function AddHabitForm({ onSubmit }: AddHabitFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    reminderTime: '',
    goal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startDate: new Date()
    });
    setFormData({ name: '', frequency: 'daily', reminderTime: '', goal: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">إضافة عادة جديدة</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم العادة
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            التكرار
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="daily">يومي</option>
            <option value="weekly">أسبوعي</option>
            <option value="monthly">شهري</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            وقت التذكير
          </label>
          <div className="relative">
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="time"
              value={formData.reminderTime}
              onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الهدف من العادة
          </label>
          <div className="relative">
            <Target className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                   transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة العادة</span>
        </button>
      </div>
    </form>
  );
}