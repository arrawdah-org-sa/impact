import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/ImpactSection';
import { SelfImpact } from './pages/SelfImpact';
import { SocialImpact } from './pages/SocialImpact';
import { LastingImpact } from './pages/LastingImpact';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { AdminRoutes } from './pages/admin';
import { ContactFooter } from './components/Footer/ContactFooter';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900" dir="rtl">
            <MainLayout>
              <ThemeSwitcher />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <ImpactSection />
                  </>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/self-impact" element={<SelfImpact />} />
                <Route path="/social-impact" element={<SocialImpact />} />
                <Route path="/lasting-impact" element={<LastingImpact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
              <ContactFooter />
            </MainLayout>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}