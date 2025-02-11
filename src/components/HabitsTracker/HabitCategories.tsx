import React from 'react';
import { Book, Heart, Moon, Sun, Users } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'spiritual',
    name: 'روحية',
    icon: <Moon className="w-5 h-5" />,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'social',
    name: 'اجتماعية',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'personal',
    name: 'شخصية',
    icon: <Heart className="w-5 h-5" />,
    color: 'bg-rose-100 text-rose-600'
  },
  {
    id: 'educational',
    name: 'تعليمية',
    icon: <Book className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-600'
  }
];

interface HabitCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function HabitCategories({ selectedCategory, onSelectCategory }: HabitCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                     ${selectedCategory === category.id 
                       ? `${category.color} shadow-md transform scale-105` 
                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}