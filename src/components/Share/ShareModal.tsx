import React from 'react';
import { X, Link2, Twitter, MessageCircle } from 'lucide-react';
import { ShareOption } from './ShareOption';
import { useShareLinks } from '../../hooks/useShareLinks';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { copyLink, shareOnTwitter, shareOnWhatsApp } = useShareLinks();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-6">مشاركة الصفحة</h3>

        <div className="space-y-4">
          <ShareOption
            icon={Link2}
            label="نسخ الرابط"
            onClick={copyLink}
            className="bg-gray-100 hover:bg-gray-200"
          />
          
          <ShareOption
            icon={Twitter}
            label="مشاركة على تويتر"
            onClick={shareOnTwitter}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600"
          />
          
          <ShareOption
            icon={MessageCircle}
            label="مشاركة على واتساب"
            onClick={shareOnWhatsApp}
            className="bg-green-100 hover:bg-green-200 text-green-600"
          />
        </div>
      </div>
    </div>
  );
}