import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export function LocationMap() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">موقعنا</h2>
      </div>
      
      <a 
        href="https://maps.app.goo.gl/vU9L2G33FiYQ62MA7"
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-[400px] rounded-lg overflow-hidden group"
      >
        <img 
          src="https://ibb.co/pQ0p8V7"
          alt="موقع المكتب التعاوني للدعوة والإرشاد بحي الروضة"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-5 h-5" />
            <span>فتح في خرائط قوقل</span>
          </div>
        </div>
      </a>
    </div>
  );
}