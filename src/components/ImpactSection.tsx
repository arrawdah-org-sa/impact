import React from 'react';
import { Heart, Users, Star } from 'lucide-react';
import { ImpactCard } from './ImpactCard';
import { useNavigate } from 'react-router-dom';

export function ImpactSection() {
  const navigate = useNavigate();
  
  const impacts = [
    {
      title: 'أثر في نفسك',
      description: 'ابدأ رحلة التغيير من نفسك. طور مهاراتك وقدراتك لتكون النسخة الأفضل من نفسك.',
      icon: Heart,
      path: '/self-impact'
    },
    {
      title: 'أثر على من حولك',
      description: 'كن مصدر إلهام للآخرين. ساعد في تطوير مجتمعك وانشر الخير من حولك.',
      icon: Users,
      path: '/social-impact'
    },
    {
      title: 'أثر يبقى بعدك',
      description: 'اترك بصمة إيجابية تستمر للأجيال القادمة. ساهم في بناء مستقبل أفضل.',
      icon: Star,
      path: '/lasting-impact'
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Impact Image */}
        <div className="relative w-full max-w-5xl mx-auto mb-16">
          <img
            src="https://ibb.co/sVLFr3X"
            alt="أنواع الأثر"
            className="w-full h-auto object-cover rounded-2xl shadow-xl"
            onError={(e) => {
              e.currentTarget.src = "https://i.ibb.co/YLvtGjV/18360435d387be5345cf.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {impacts.map((impact) => (
            <ImpactCard
              key={impact.title}
              title={impact.title}
              description={impact.description}
              onClick={() => navigate(impact.path)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}