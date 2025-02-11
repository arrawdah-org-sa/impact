import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, Trophy, UserCircle, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'لوحة الأثر', icon: LayoutDashboard },
    { path: '/challenge', label: 'تحدي الشهر', icon: Trophy },
    { path: '/profile', label: 'صفحتي', icon: UserCircle },
    { path: '/contact', label: 'تواصل معنا', icon: MessageCircle },
  ];

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            اصنع أثراً
          </Link>

          {user && (
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-primary-600" />
              <span>مرحباً، {user.displayName}</span>
            </div>
          )}
        </div>

        {user && (
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                              ${location.pathname === item.path
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                              }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}