import React, { useState } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../lib/themes';

export function ThemeSwitcher() {
  const { currentTheme, isDark, setTheme, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleDarkMode}
        className={`p-3 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
        }`}
        title={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
          }`}
          title="تغيير المظهر"
        >
          <Palette className="w-5 h-5" />
        </button>

        {isOpen && (
          <div 
            className={`absolute top-full left-0 mt-2 p-2 rounded-lg min-w-[200px]
                       transition-all duration-300 transform origin-top-left
                       ${isDark ? 'bg-gray-800' : 'bg-white shadow-xl'}`}
          >
            {Object.entries(themes).map(([name, theme]) => (
              <button
                key={name}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-md mb-1 last:mb-0
                           transition-colors duration-200 flex items-center justify-between
                           ${isDark 
                             ? 'hover:bg-gray-700 text-gray-300' 
                             : 'hover:bg-gray-100 text-gray-700'}
                           ${currentTheme.name === theme.name ? 'font-bold' : ''}`}
              >
                <span>{theme.name}</span>
                {currentTheme.name === theme.name && (
                  <div className={`w-2 h-2 rounded-full ${
                    isDark ? 'bg-primary-400' : 'bg-primary-500'
                  }`} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}