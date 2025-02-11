import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '../common/Input';
import { validateHabitName } from '../../utils/validation';

interface AddHabitFormProps {
  onAdd: (habit: string, description: string) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateHabitName(habitName)) {
      setError('يرجى إدخال اسم عادة صحيح باللغة العربية (3-50 حرف)');
      return;
    }

    onAdd(habitName, description);
    setHabitName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Plus className="w-5 h-5 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">إضافة عادة جديدة</h3>
      </div>

      <div className="space-y-4">
        <Input
          label="اسم العادة"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="أدخل اسم العادة الجديدة"
          error={error}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            وصف العادة
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            rows={4}
            placeholder="اكتب وصفاً مختصراً للعادة..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                   hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                   transition-colors duration-200"
        >
          إضافة العادة
        </button>
      </div>
    </form>
  );
}