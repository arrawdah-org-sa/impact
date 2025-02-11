import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Check, AlertCircle } from 'lucide-react';
import { validateHabitName, sanitizeInput } from '../../utils/validation';
import { habitSuggestions } from '../../data/habitSuggestions';

interface HabitFormProps {
  onSubmit: (habit: string, steps: string) => void;
}

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [habit, setHabit] = useState('');
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHabitChange = (value: string) => {
    setHabit(value);
    setError('');

    if (value.length >= 2) {
      const suggestions = habitSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setHabit(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sanitizedHabit = sanitizeInput(habit);
    const sanitizedSteps = sanitizeInput(steps);

    if (!validateHabitName(sanitizedHabit)) {
      setError('يرجى إدخال اسم عادة صحيح باللغة العربية (3-50 حرف)');
      return;
    }

    onSubmit(sanitizedHabit, sanitizedSteps);
    setHabit('');
    setSteps('');
    setShowSuggestions(false);
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="bg-white rounded-xl shadow-md p-6 mb-8 relative"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Plus className="w-5 h-5 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">إضافة عادة جديدة</h3>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="habit" className="block text-sm font-medium text-gray-700 mb-1">
            اسم العادة
          </label>
          <input
            type="text"
            id="habit"
            value={habit}
            onChange={(e) => handleHabitChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="اكتب اسم العادة الجديدة هنا..."
            dir="rtl"
          />
          
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-right px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">
            خطوات التطبيق
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="اكتب طرق تطبيق العادة هنا..."
            dir="rtl"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setHabit('');
              setSteps('');
              setError('');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg
                     hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     transition-colors duration-200"
          >
            <Check className="w-5 h-5" />
            <span>إضافة العادة</span>
          </button>
        </div>
      </div>
    </form>
  );
}