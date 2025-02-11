import React, { useState } from 'react';
import { Edit2, Trash2, UserCheck, UserX } from 'lucide-react';
import { useUsers } from '../../../hooks/useUsers';

export function UserList() {
  const { users, updateUser, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.includes(searchTerm) || 
    user.email.includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المستخدمون</h2>
        <input
          type="search"
          placeholder="بحث عن مستخدم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">المستخدم</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">البريد الإلكتروني</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">الحالة</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">تاريخ التسجيل</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {user.username[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isActive ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      نشط
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      غير نشط
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateUser(user.id, { isActive: !user.isActive })}
                      className={`p-1 rounded-full ${
                        user.isActive 
                          ? 'text-red-600 hover:bg-red-100' 
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {user.isActive ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => updateUser(user.id)}
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}