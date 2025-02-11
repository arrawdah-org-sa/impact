import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ReminderSettings {
  enabled: boolean;
  time: string;
  days: string[];
}

export function useReminders() {
  const [settings, setSettings] = useLocalStorage<ReminderSettings>('reminder_settings', {
    enabled: false,
    time: '05:00',
    days: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  });

  useEffect(() => {
    if (settings.enabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [settings.enabled]);

  const scheduleReminder = () => {
    if (!settings.enabled) return;

    const [hours, minutes] = settings.time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('تذكير بالعادات اليومية', {
          body: 'حان وقت متابعة عاداتك اليومية!',
          icon: '/icon.png'
        });
      }
      scheduleReminder();
    }, timeUntilReminder);
  };

  useEffect(() => {
    if (settings.enabled) {
      scheduleReminder();
    }
  }, [settings]);

  return { settings, setSettings };
}