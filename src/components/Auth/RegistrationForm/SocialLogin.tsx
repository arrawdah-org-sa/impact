import React from 'react';
import { Google, Facebook, Twitter } from 'lucide-react';

export function SocialLogin() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                   bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
      >
        <Google className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                   bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
      >
        <Facebook className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                   bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
      >
        <Twitter className="w-5 h-5" />
      </button>
    </div>
  );
}