import React from 'react';
import { Trophy, Star, Flame } from 'lucide-react';
import { topUsers } from '../../data/topUsers';

export function TopUsersList() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">المتميزون في صناعة الأثر</h2>
          <p className="text-gray-600">نماذج ملهمة تقود التغيير الإيجابي في مجتمعنا</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <span className="text-gray-600">{user.age} سنة</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-primary-600">
                    <Trophy className="w-5 h-5 ml-2" />
                    <span className="font-medium">{user.impactArea}</span>
                  </div>

                  <p className="text-gray-600 text-sm">{user.achievement}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-yellow-500">
                      <Flame className="w-4 h-4 ml-1" />
                      <span className="font-medium">{user.streak} يوم متتالي</span>
                    </div>
                    
                    <div className="flex items-center text-green-500">
                      <Star className="w-4 h-4 ml-1" />
                      <span className="font-medium">{user.completedHabits} عادات مكتملة</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">نسبة التفاعل</span>
                  <span className="text-sm font-medium text-primary-600">
                    {user.engagementRate}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                    style={{ width: `${user.engagementRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}