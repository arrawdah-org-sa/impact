import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useContent } from '../../../hooks/useContent';

export function ContentList() {
  const { content, addContent, updateContent, deleteContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = content.filter(item => 
    item.title.includes(searchTerm) || 
    item.category.includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المحتوى</h2>
          <p className="text-gray-500 dark:text-gray-400">إدارة محتوى الموقع</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="بحث في المحتوى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={() => addContent()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة محتوى</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <span className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-600">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(`/preview/${item.id}`, '_blank')}
                  className="p-1 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => updateContent(item.id)}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteContent(item.id)}
                  className="p-1 rounded-full text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>آخر تحديث: {new Date(item.updatedAt).toLocaleDateString('ar-SA')}</span>
              <span>{item.views} مشاهدة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}