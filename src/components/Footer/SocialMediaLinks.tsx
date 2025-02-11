import React from 'react';
import { Twitter, Instagram, Facebook, Youtube, MessageCircle, Video } from 'lucide-react';

const socialLinks = [
  { name: 'تويتر', icon: Twitter, color: 'hover:text-blue-400', url: 'https://twitter.com/jawalk1' },
  { name: 'انستقرام', icon: Instagram, color: 'hover:text-pink-500', url: 'https://instagram.com/jawalk1' },
  { name: 'فيس بوك', icon: Facebook, color: 'hover:text-blue-600', url: 'https://facebook.com/jawalk1' },
  { name: 'سناب شات', icon: MessageCircle, color: 'hover:text-yellow-400', url: 'https://snapchat.com/add/jawalk1' },
  { name: 'تيك توك', icon: Video, color: 'hover:text-gray-100', url: 'https://tiktok.com/@jawalk1' },
  { name: 'يوتيوب', icon: Youtube, color: 'hover:text-red-500', url: 'https://www.youtube.com/@jawalkalkhair' },
];

export function SocialMediaLinks() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-center">تابعنا على @jawalk1</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-colors duration-200 text-primary-200 ${link.color}`}
            title={link.name}
          >
            <link.icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  );
}