import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Activity, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { icon: Users, label: 'إدارة المستخدمين', path: '/admin/users' },
  { icon: FileText, label: 'إدارة المحتوى', path: '/admin/content' },
  { icon: Activity, label: 'تتبع النشاط', path: '/admin/activity' },
  { icon: Settings, label: 'إعدادات الموقع', path: '/admin/settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen shadow-lg">
          <div className="p-4">
            <h1 className="text-xl font-bold text-primary-600 mb-8">لوحة الإدارة</h1>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700
                           text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-4 border-t dark:border-gray-700">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}