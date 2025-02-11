import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SocialLinks {
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

interface Settings {
  siteName: string;
  siteDescription: string;
  socialLinks: SocialLinks;
  supportEmail: string;
  whatsappNumber: string;
  googleAnalyticsId: string;
}

const defaultSettings: Settings = {
  siteName: 'اصنع أثراً',
  siteDescription: 'منصة التأثير الإيجابي',
  socialLinks: {
    twitter: 'https://twitter.com/jawalk1',
    facebook: 'https://facebook.com/jawalk1',
    instagram: 'https://instagram.com/jawalk1',
    youtube: 'https://youtube.com/@jawalkalkhair'
  },
  supportEmail: 'support@jawalk.com',
  whatsappNumber: '+966558118112',
  googleAnalyticsId: ''
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'general'));
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as Settings);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    try {
      await updateDoc(doc(db, 'settings', 'general'), newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  const resetSettings = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) {
      updateSettings(defaultSettings);
    }
  };

  return { settings, updateSettings, resetSettings };
}