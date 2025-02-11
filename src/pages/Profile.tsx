import React from 'react';
import { MetaTags } from '../components/SEO/MetaTags';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileForm } from '../components/Profile/ProfileForm';
import { BackToHome } from '../components/common/BackToHome';

export function Profile() {
  return (
    <>
      <MetaTags
        title="الملف الشخصي | اصنع أثراً"
        description="إدارة الملف الشخصي وتحديث المعلومات"
        path="/profile"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <BackToHome />
        <div className="container mx-auto px-4">
          <ProfileHeader />
          <ProfileForm />
        </div>
      </div>
    </>
  );
}