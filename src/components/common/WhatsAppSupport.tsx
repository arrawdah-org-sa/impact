import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppSupportProps {
  phoneNumber: string;
  className?: string;
}

export function WhatsAppSupport({ phoneNumber, className = '' }: WhatsAppSupportProps) {
  // Handle both Wa.me and regular phone number formats
  const whatsappUrl = phoneNumber.startsWith('Wa.me/') 
    ? `https://${phoneNumber}`
    : `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg 
                 hover:bg-green-600 transition-colors duration-200 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>تواصل معنا عبر واتساب</span>
    </a>
  );
}