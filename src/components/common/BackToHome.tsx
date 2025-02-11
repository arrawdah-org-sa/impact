import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md 
                 hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-gray-900"
    >
      <Home className="w-5 h-5" />
      <span>الرئيسية</span>
    </button>
  );
}