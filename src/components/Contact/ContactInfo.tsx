import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ContactWithWhatsApp } from '../common/ContactWithWhatsApp';

export function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">العنوان</h3>
            <p className="text-gray-600">المملكة العربية السعودية - الرياض</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-primary-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">الهاتف</h3>
            <p className="text-gray-600 mb-3">+966558118112</p>
            <ContactWithWhatsApp phoneNumber="+966558118112" />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-primary-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">البريد الإلكتروني</h3>
            <a 
              href="mailto:info@jawalk.com"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              info@jawalk.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}