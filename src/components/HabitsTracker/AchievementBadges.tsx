import React from 'react';
import { Award, Star, Zap, Trophy } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
}

interface AchievementBadgesProps {
  progress: number;
  streak: number;
  totalHabits: number;
}

export function AchievementBadges({ progress, streak, totalHabits }: AchievementBadgesProps) {
  const badges: Badge[] = [
    {
      id: 'starter',
      name: 'البداية القوية',
      description: 'أكملت أول أسبوع من العادات',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      unlocked: progress >= 10
    },
    {
      id: 'consistent',
      name: 'المثابر',
      description: 'حافظت على العادات لمدة 30 يوم',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      unlocked: streak >= 30
    },
    {
      id: 'master',
      name: 'سيد العادات',
      description: 'أكملت 5 عادات بنجاح',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      unlocked: totalHabits >= 5
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`p-4 rounded-lg border-2 transition-all duration-300
                     ${badge.unlocked 
                       ? `${badge.color} border-transparent` 
                       : 'bg-gray-100 border-gray-200 opacity-50'}`}
        >
          <div className="flex items-center gap-3 mb-2">
            {badge.icon}
            <h4 className="font-semibold">{badge.name}</h4>
          </div>
          <p className="text-sm">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}