import React from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة",
    author: "حديث شريف"
  },
  {
    text: "خير الناس أنفعهم للناس",
    author: "حديث شريف"
  },
  {
    text: "إنما الأعمال بالنيات",
    author: "حديث شريف"
  },
  {
    text: "من حسن إسلام المرء تركه ما لا يعنيه",
    author: "حديث شريف"
  }
];

export function DailyQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white rounded-full">
          <Quote className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <p className="text-lg text-gray-800 mb-2">{randomQuote.text}</p>
          <p className="text-sm text-primary-600 font-medium">{randomQuote.author}</p>
        </div>
      </div>
    </div>
  );
}