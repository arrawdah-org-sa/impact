import React from 'react';
import { Twitter, Instagram, Facebook, Youtube, Video, MessageCircle } from 'lucide-react';

const socialLinks = [
  { 
    name: 'فيس بوك',
    icon: Facebook,
    color: 'text-[#1877F2]',
    hoverBg: 'hover:bg-[#1877F2]/10',
    url: 'https://facebook.com/jawalk1'
  },
  { 
    name: 'تويتر',
    icon: Twitter,
    color: 'text-[#1DA1F2]',
    hoverBg: 'hover:bg-[#1DA1F2]/10',
    url: 'https://twitter.com/jawalk1'
  },
  { 
    name: 'انستقرام',
    icon: Instagram,
    color: 'text-transparent bg-clip-text bg-gradient-to-tr from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] to-[#E1306C]',
    hoverBg: 'hover:bg-gradient-to-tr hover:from-[#405DE6]/10 hover:via-[#5851DB]/10 hover:via-[#833AB4]/10 hover:via-[#C13584]/10 hover:to-[#E1306C]/10',
    url: 'https://instagram.com/jawalk1'
  },
  { 
    name: 'يوتيوب',
    icon: Youtube,
    color: 'text-[#FF0000]',
    hoverBg: 'hover:bg-[#FF0000]/10',
    url: 'https://youtube.com/@jawalkalkhair'
  },
  { 
    name: 'تيك توك',
    icon: Video,
    color: 'text-black dark:text-white',
    hoverBg: 'hover:bg-black/5 dark:hover:bg-white/10',
    url: 'https://tiktok.com/@jawalk1'
  },
  { 
    name: 'سناب شات',
    icon: MessageCircle,
    color: 'text-[#FFFC00]',
    hoverBg: 'hover:bg-[#FFFC00]/10',
    url: 'https://snapchat.com/add/jawalk1'
  }
];

export function SocialLinks() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        تابعنا على منصات التواصل
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-2 p-4 rounded-lg
                       bg-gray-50 dark:bg-gray-700
                       transition-all duration-200 group ${link.hoverBg}`}
          >
            <link.icon className={`w-6 h-6 ${link.color} transition-colors duration-200`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 
                           group-hover:text-gray-900 dark:group-hover:text-white">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}