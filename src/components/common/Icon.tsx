import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export function Icon({ 
  icon: IconComponent,
  size = 'md',
  className = '',
  label
}: IconProps) {
  return (
    <div className="inline-flex items-center justify-center" title={label}>
      <IconComponent 
        className={`${sizes[size]} ${className}`}
        aria-label={label}
        aria-hidden={!label}
      />
    </div>
  );
}