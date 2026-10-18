/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CounterSection } from '@/components/CounterSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { HireMeSection } from '@/components/HireMeSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ResumeSection } from '@/components/ResumeSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CvModal } from '@/components/CvModal';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { auth } from '@/lib/auth';
import { getInitialStoreData, PortfolioStoreData } from '@/lib/storage';

export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  
  // Admin & View Routing
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
  const [storeData, setStoreData] = useState<PortfolioStoreData>(getInitialStoreData());

  useEffect(() => {
    // Check URL query parameter (e.g. ?admin=true or hash #admin)
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setViewMode('admin');
    }

    const handleDataChanged = () => {
      setStoreData(getInitialStoreData());
    };

    window.addEventListener('portfolio-data-changed', handleDataChanged);
    return () => window.removeEventListener('portfolio-data-changed', handleDataChanged);
  }, []);

  const handleSelectService = (serviceName: string) => {
    setContactSubject(`Demande de prestation : ${serviceName}`);
    const contactEl = document.getElementById('contact-section');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin mode is active
  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAuthenticated(true)}
          onBackToPortfolio={() => setViewMode('public')}
        />
      );
    }

    return (
      <AdminDashboard
        onBackToPortfolio={() => setViewMode('public')}
        onLogout={() => {
          auth.logout();
          setIsAuthenticated(false);
          setViewMode('public');
        }}
      />
    );
  }

  // Public Portfolio View (Clyde ThemeWagon template)
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* 1. Clyde Sticky Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenCv={() => setIsCvOpen(true)}
      />

      <main>
        {/* 2. Hero Section (#home-section) */}
        <Hero
          lang={lang}
          onOpenCv={() => setIsCvOpen(true)}
          profile={storeData.profile}
        />

        {/* 3. Section Counter (#section-counter) */}
        <CounterSection lang={lang} />

        {/* 4. About Section (#about-section) */}
        <AboutSection
          lang={lang}
          onOpenCv={() => setIsCvOpen(true)}
          profile={storeData.profile}
        />

        {/* 5. Skills Section (#skills-section) */}
        <SkillsSection lang={lang} />

        {/* 6. Services Section (#services-section) */}
        <ServicesSection
          lang={lang}
          onSelectService={handleSelectService}
        />

        {/* 7. Hire Me Call-to-Action Banner (ftco-hireme) */}
        <HireMeSection lang={lang} />

        {/* 8. Projects Section (#projects-section) */}
        <ProjectsSection
          lang={lang}
          projects={storeData.projects}
        />

        {/* 9. Resume & Career Journey Timeline */}
        <ResumeSection lang={lang} />

        {/* 10. Testimonials Section (#testimony-section) */}
        <TestimonialsSection lang={lang} />

        {/* 11. Blog Section (#blog-section) */}
        <BlogSection
          lang={lang}
          posts={storeData.blogPosts}
        />

        {/* 12. Contact Section (#contact-section) */}
        <ContactSection lang={lang} prefilledSubject={contactSubject} />
      </main>

      {/* 13. Clyde 4-Column Footer */}
      <Footer
        lang={lang}
        onOpenCv={() => setIsCvOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        lang={lang}
      />
    </div>
  );
}
