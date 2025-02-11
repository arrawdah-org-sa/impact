import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ShareOptionProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

export function ShareOption({ icon: Icon, label, onClick, className = '' }: ShareOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}