import React, { useState } from 'react';
import { Calendar, Clock, User, Activity } from 'lucide-react';
import { useActivity } from '../../../hooks/useActivity';

export function ActivityLog() {
  const { activities, stats } = useActivity();
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">المستخدمون النشطون</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">معدل المشاركة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.engagementRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">العادات المكتملة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedHabits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">متوسط وقت الاستخدام</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgTimeSpent} د</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">سجل النشاط</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </select>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  {activity.user.username[0].toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.user.username}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleTimeString('ar-SA')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {activity.description}
                </p>
                {activity.details && (
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {activity.details}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}