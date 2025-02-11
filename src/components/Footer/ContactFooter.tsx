import React from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { SocialMediaLinks } from './SocialMediaLinks';
import { ContactWithWhatsApp } from '../common/ContactWithWhatsApp';

export function ContactFooter() {
  return (
    <div className="relative text-white">
      <div className="absolute inset-0">
        <img 
          src="https://i.ibb.co/wrqW0ZX/new-background.jpg"
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900/90 to-primary-800/95" />
      </div>

      <div className="relative py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-primary-200">نرحب بتواصلكم معنا!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary-400" />
              <h3 className="font-bold mb-2">العنوان</h3>
              <p className="text-primary-200">المملكة العربية السعودية - الرياض</p>
            </div>

            <div className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6">
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary-400" />
              <h3 className="font-bold mb-2">الهاتف</h3>
              <p className="text-primary-200 mb-3">+966558118112</p>
              <ContactWithWhatsApp phoneNumber="+966558118112" />
            </div>

            <div className="text-center backdrop-blur-md bg-white/5 rounded-xl p-6">
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary-400" />
              <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
              <a 
                href="mailto:info@jawalk.com"
                className="text-primary-200 hover:text-primary-400 transition-colors"
              >
                info@jawalk.com
              </a>
            </div>
          </div>

          <SocialMediaLinks />
        </div>
      </div>
    </div>
  );
}