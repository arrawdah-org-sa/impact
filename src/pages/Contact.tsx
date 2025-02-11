import React from 'react';
import { ContactInfo } from '../components/Contact/ContactInfo';
import { ContactForm } from '../components/Contact/ContactForm';
import { SocialLinks } from '../components/Contact/SocialLinks';
import { LocationMap } from '../components/Contact/LocationMap';
import { MetaTags } from '../components/SEO/MetaTags';

export function Contact() {
  return (
    <>
      <MetaTags
        title="تواصل معنا | اصنع أثراً"
        description="نرحب بتواصلكم معنا عبر قنوات التواصل المختلفة"
        path="/contact"
      />
      
      <div className="min-h-screen py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
            <p className="text-xl text-gray-600">نرحب بتواصلكم واستفساراتكم</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
            <div className="space-y-8">
              <ContactInfo />
              <SocialLinks />
            </div>
            <ContactForm />
          </div>

          <LocationMap />
        </div>
      </div>
    </>
  );
}