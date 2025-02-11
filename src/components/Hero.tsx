import React, { useState } from 'react';
import { Sparkles, Star, Users, Heart } from 'lucide-react';
import { Logo } from './common/Logo';
import { AuthModal } from './Auth/AuthModal';

export function Hero() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] transform rotate-45" />
        </div>
        
        {/* New Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://i.ibb.co/j5kP9HX/background-image.jpg" 
            alt="Background Pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="mb-12">
          <Logo size="lg" className="mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8 text-white/90">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">منصة التأثير الإيجابي الأولى</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block mb-2">كن ذا</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                أثر إيجابي
              </span>
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-400/50" />
              </svg>
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            اصنع تأثيراً إيجابياً في حياتك وحياة من حولك، واترك بصمة خير تدوم
          </p>

          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-4 bg-white text-primary-900 rounded-xl font-semibold 
                     hover:bg-primary-50 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10">ابدأ رحلتك الآن</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            {[
              { icon: Users, label: 'مستخدم نشط', value: '+10,000' },
              { icon: Star, label: 'عادة إيجابية', value: '+50,000' },
              { icon: Heart, label: 'أثر إيجابي', value: '+25,000' }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="p-3 bg-primary-500/20 rounded-xl mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900 to-transparent" />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  );
}