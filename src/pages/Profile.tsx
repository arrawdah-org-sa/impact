import React from 'react';
import { Navigate } from 'react-router-dom';
import { MetaTags } from '../components/SEO/MetaTags';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileForm } from '../components/Profile/ProfileForm';
import { BackToHome } from '../components/common/BackToHome';
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>جارٍ التحميل...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <MetaTags
        title="الملف الشخصي | اصنع أثراً"
        description="إدارة الملف الشخصي وتحديث المعلومات"
        path="/profile"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <BackToHome />
        <div className="container mx-auto px-4">
          <ProfileHeader />
          <ProfileForm />
        </div>
      </div>
    </>
  );
}