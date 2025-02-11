import React from 'react';
import { Heart } from 'lucide-react';

export function AboutHero() {
  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary-800/50 rounded-full mb-8">
          <Heart className="w-8 h-8 text-primary-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
        <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
          جوال الخير هو فريق متخصص في إنتاج ونشر المواد الدعوية والتوعوية عبر الهاتف الجوال
        </p>
      </div>
    </div>
  );
}