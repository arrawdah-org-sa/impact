import React from 'react';
import { AboutHero } from '../components/About/AboutHero';
import { AboutContent } from '../components/About/AboutContent';
import { MetaTags } from '../components/SEO/MetaTags';

export function About() {
  return (
    <>
      <MetaTags
        title="من نحن | جوال الخير"
        description="جوال الخير هو فريق متخصص في إنتاج ونشر المواد الدعوية والتوعوية عبر الهاتف الجوال"
        path="/about"
      />
      <AboutHero />
      <AboutContent />
    </>
  );
}