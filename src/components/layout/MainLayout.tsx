import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-4 right-4 z-50 p-2 rounded-lg shadow-lg
                   ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
                   transition-all duration-300`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className={`transition-all duration-300 p-4 pt-20
                       ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        {children}
      </main>
    </div>
  );
}