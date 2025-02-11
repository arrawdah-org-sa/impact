import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { validateNote, sanitizeInput } from '../../utils/validation';

interface HabitNoteProps {
  onSubmit: (note: string) => void;
}

export function HabitNote({ onSubmit }: HabitNoteProps) {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sanitizedNote = sanitizeInput(note);
    const validationError = validateNote(sanitizedNote);

    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(sanitizedNote);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary-600" />
        <h4 className="text-lg font-semibold text-gray-900">ما الأثر الذي وجدته؟</h4>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        rows={4}
        placeholder="شارك تجربتك وأثرها على حياتك..."
      />

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        مشاركة
      </button>
    </form>
  );
}