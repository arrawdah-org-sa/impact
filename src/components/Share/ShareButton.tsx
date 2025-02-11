import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onClick: () => void;
}

export function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-3 bg-primary-600 text-white rounded-full shadow-lg 
                 hover:bg-primary-700 transition-all duration-300 flex items-center gap-2"
      aria-label="مشاركة الصفحة"
    >
      <Share2 className="w-5 h-5" />
      <span className="text-sm">مشاركة</span>
    </button>
  );
}