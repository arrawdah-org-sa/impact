import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withShadow?: boolean;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-24 h-24'
};

export function Logo({ className = '', size = 'md', withShadow = true }: LogoProps) {
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img
          src="https://i.ibb.co/k8JvkZb/1j-Clqalx-400x400.jpg"
          alt="اصنع أثراً"
          className={`w-full h-full object-cover rounded-xl transform transition-transform duration-700 animate-float
                     ${withShadow ? 'shadow-lg' : ''}`}
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400.png?text=اصنع+أثراً';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-xl" />
      </div>
    </div>
  );
}