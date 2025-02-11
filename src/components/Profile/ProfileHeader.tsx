import React from 'react';
import { User, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/dates';

export function ProfileHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="text-center mb-12">
      <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {user.nickname}
      </h1>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Phone className="w-5 h-5" />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="w-5 h-5" />
          <span>
            عضو منذ {formatDate(new Date(user.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
}