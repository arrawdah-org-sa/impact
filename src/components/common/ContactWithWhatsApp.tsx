import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ContactWithWhatsAppProps {
  phoneNumber: string;
}

export function ContactWithWhatsApp({ phoneNumber }: ContactWithWhatsAppProps) {
  // Format WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg 
                 hover:bg-green-600 transition-colors duration-200"
    >
      <MessageCircle className="w-5 h-5" />
      <span>تواصل عبر واتساب</span>
    </a>
  );
}