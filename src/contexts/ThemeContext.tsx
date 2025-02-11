import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../lib/themes';
import type { Theme } from '../types/theme';

interface ThemeContextType {
  currentTheme: Theme;
  isDark: boolean;
  setTheme: (themeName: string) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    localStorage.setItem('darkMode', isDark.toString());
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeName, isDark]);

  const currentTheme = themes[isDark ? 'dark' : themeName];

  const setTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
      setIsDark(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    currentTheme,
    isDark,
    setTheme,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}