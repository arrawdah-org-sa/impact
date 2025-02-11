import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  UserCircle, 
  MessageCircle, 
  LogOut,
  Home,
  Settings,
  Heart,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Logo } from '../common/Logo';
import { ConfirmPopup } from '../common/ConfirmPopup';
import { auth } from '../../lib/firebase';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const { isDark, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('حدث خطأ أثناء تسجيل الخروج. الرجاء المحاولة مرة أخرى.');
    }
  };

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/dashboard', label: 'لوحة الأثر', icon: LayoutDashboard },
    { path: '/challenge', label: 'تحدي الشهر', icon: Trophy },
    { path: '/self-impact', label: 'أثري الشخصي', icon: Heart },
    { path: '/profile', label: 'صفحتي', icon: UserCircle },
    { path: '/contact', label: 'تواصل معنا', icon: MessageCircle },
    { path: '/settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40
                   transition-opacity duration-300
                   ${isVisible ? 'opacity-100' : 'opacity-0'}
                   ${isOpen ? 'visible' : 'invisible'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-screen z-50 bg-white dark:bg-gray-800
                   w-[280px] shadow-xl
                   transform transition-transform duration-300 ease-in-out
                   ${isVisible ? 'translate-x-0' : 'translate-x-full'}
                   ${isOpen ? 'visible' : 'invisible'}`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 
                     dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <span className="font-bold text-xl text-primary-600">اصنع أثراً</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors
                           ${isDark 
                             ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {user && (
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-primary-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                  ${isDark ? 'bg-gray-600' : 'bg-primary-100'}`}>
                    <UserCircle className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-primary-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium">مرحباً،</p>
                    <p className={`text-sm ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                      {user.displayName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose()}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                              ${isActive 
                                ? isDark 
                                  ? 'bg-gray-700 text-primary-400' 
                                  : 'bg-primary-50 text-primary-600'
                                : isDark
                                  ? 'text-gray-300 hover:bg-gray-700'
                                  : 'text-gray-600 hover:bg-gray-50'} 
                              font-medium`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive 
                        ? isDark ? 'text-primary-400' : 'text-primary-600'
                        : isDark ? 'text-gray-400' : 'text-gray-400'
                    }`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className={`absolute right-0 w-1 h-8 rounded-l-lg
                                     ${isDark ? 'bg-primary-400' : 'bg-primary-600'}`} />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          {user && (
            <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors
                           ${isDark 
                             ? 'text-red-400 hover:bg-gray-700' 
                             : 'text-red-600 hover:bg-red-50'}`}
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل خروج</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Sign Out Confirmation */}
      <ConfirmPopup
        isOpen={showSignOutConfirm}
        title="تسجيل الخروج"
        message="هل أنت متأكد من تسجيل الخروج من حسابك؟"
        confirmText="تسجيل الخروج"
        cancelText="إلغاء"
        onConfirm={handleSignOut}
        onCancel={() => setShowSignOutConfirm(false)}
      />
    </>
  );
}