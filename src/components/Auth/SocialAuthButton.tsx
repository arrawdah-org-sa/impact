import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SocialAuthButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  provider: 'google' | 'apple';
}

export function SocialAuthButton({ icon: Icon, label, onClick, provider }: SocialAuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full
                 border border-gray-300 font-medium
                 transition-colors duration-200
                 ${provider === 'apple' 
                   ? 'bg-black text-white hover:bg-gray-900' 
                   : 'bg-white text-gray-700 hover:bg-gray-50'}`}
      type="button"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}