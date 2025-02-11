import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ImpactCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function ImpactCard({ title, description, onClick }: ImpactCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg 
                 hover:shadow-2xl transition-all duration-500 cursor-pointer
                 transform hover:-translate-y-1 hover:scale-105
                 animate-fade-in"
    >
      <div className="relative z-10">
        <h3 className="mb-4 text-2xl font-bold text-gray-900 group-hover:text-primary-600
                       transition-colors duration-300">{title}</h3>
        <p className="mb-4 text-gray-600 group-hover:text-gray-800
                      transition-colors duration-300">{description}</p>
        <div className="flex items-center text-primary-500 group-hover:text-primary-600
                        transition-all duration-300">
          <span className="font-medium">اكتشف المزيد</span>
          <ArrowRight className="mr-2 h-4 w-4 transform group-hover:translate-x-1
                                transition-transform duration-300" />
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary-50 to-primary-100 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}