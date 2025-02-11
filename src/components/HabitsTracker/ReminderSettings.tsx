import React, { useState } from 'react';
import { Bell, Settings } from 'lucide-react';

interface ReminderSettingsProps {
  onSave: (settings: ReminderSettings) => void;
}

interface ReminderSettings {
  enabled: boolean;
  time: string;
  days: string[];
}

export function ReminderSettings({ onSave }: ReminderSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: false,
    time: '05:00',
    days: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  });

  const handleSave = () => {
    onSave(settings);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Bell className="w-5 h-5 text-primary-600" />
        <span>إعدادات التذكير</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">إعدادات التذكير</h4>
            <Settings className="w-5 h-5 text-gray-500" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>تفعيل التذكير</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وقت التذكير</label>
              <input
                type="time"
                value={settings.time}
                onChange={(e) => setSettings({ ...settings, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">أيام التذكير</label>
              <div className="grid grid-cols-4 gap-2">
                {settings.days.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      const newDays = settings.days.includes(day)
                        ? settings.days.filter(d => d !== day)
                        : [...settings.days, day];
                      setSettings({ ...settings, days: newDays });
                    }}
                    className={`px-2 py-1 text-sm rounded-md ${
                      settings.days.includes(day)
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              حفظ الإعدادات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}