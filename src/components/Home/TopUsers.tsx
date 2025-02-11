import React from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../lib/firebase';

export function TopUsers() {
  const [users] = useCollectionData(
    query(collection(db, 'users'), orderBy('completedHabits', 'desc'), limit(5))
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">المتميزون في صناعة العادات</h3>
      <div className="space-y-4">
        {users?.map((user, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 ml-4">#{index + 1}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{user.username}</h4>
                <p className="text-sm text-gray-600">{user.completedHabits} عادة مكتملة</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {user.streak} أيام متتالية
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}