import { useState, useEffect } from 'react';

export function useShareLinks() {
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert('تم نسخ الرابط بنجاح');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = 'شارك في صناعة الأثر الإيجابي من خلال منصة اصنع أثراً';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = 'شارك في صناعة الأثر الإيجابي من خلال منصة اصنع أثراً';
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + pageUrl)}`;
    window.open(url, '_blank');
  };

  return {
    copyLink,
    shareOnTwitter,
    shareOnWhatsApp
  };
}