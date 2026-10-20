import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase, 
  Check, 
  ArrowRight,
  Download
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface AboutSectionProps {
  lang: 'fr' | 'en';
  onOpenCv: () => void;
  profile?: typeof PORTFOLIO_DATA.profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenCv, profile = PORTFOLIO_DATA.profile }) => {

  const personalInfo = [
    { label: { fr: 'Nom complet', en: 'Full Name' }, value: profile.name },
    { label: { fr: 'Expérience', en: 'Experience' }, value: '4+ Années' },
    { label: { fr: 'Localisation', en: 'Address' }, value: 'Cotonou, Bénin' },
    { label: { fr: 'Disponibilité', en: 'Availability' }, value: 'Sur site & Télétravail (Remote)' },
    { label: { fr: 'Email', en: 'Email' }, value: profile.email, isEmail: true },
    { label: { fr: 'WhatsApp', en: 'Phone / WhatsApp' }, value: '+229 01 96 00 00 00' },
  ];

  return (
    <section id="about-section" className="py-24 bg-slate-50 dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 2-Column Clyde Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait with experience badge (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2.5">
              <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 aspect-[4/5] flex items-end justify-center">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  className="w-full h-full object-contain object-bottom filter contrast-105"
                />
              </div>
            </div>

            {/* Clyde Experience Float Badge */}
            <div className="absolute -bottom-5 right-4 sm:right-8 bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950 p-4 rounded-xl shadow-xl font-heading flex items-center gap-3">
              <span className="text-3xl font-black">4+</span>
              <div className="text-xs font-bold uppercase leading-tight">
                {lang === 'fr' ? "Années d'expérience" : 'Years of Experience'}
              </div>
            </div>
          </div>

          {/* Right Column: Clyde Intro & Personal Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Heading in Clyde style */}
            <div className="heading-section">
              <span className="subheading">{lang === 'fr' ? 'Présentation' : 'My Intro'}</span>
              <h2>{lang === 'fr' ? 'À Propos de Moi' : 'About Me'}</h2>
            </div>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                {lang === 'fr'
                  ? 'Je suis Denis ASSOGBA, développeur passionné par la conception de systèmes digitaux utiles, rapides et fiables. J’accompagne les entreprises, PME et porteurs de projets dans la digitalisation de leurs processus métiers.'
                  : 'I am Denis ASSOGBA, a software engineer passionate about engineering practical, fast, and scalable digital solutions. I help organizations, enterprises, and founders transform their operational challenges into robust applications.'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Spécialisé en développement mobile cross-platform avec Flutter (iOS & Android), en architectures web robustes sous Laravel, et en ERP de gestion commerciale lourde sous WinDev & HFSQL, je garantis un travail soigné, documenté et livré dans les délais.'
                  : 'Specializing in cross-platform mobile apps with Flutter, production backends with Laravel, and mission-critical enterprise desktop ERPs with WinDev & HFSQL, I deliver clean, tested, and maintainable software.'}
              </p>
            </div>

            {/* Personal Details List in Clyde style */}
            <div className="pt-2">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm pb-6 border-b border-slate-200 dark:border-slate-800">
                {personalInfo.map((item, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                      {item.label[lang]} :
                    </span>
                    {item.isEmail ? (
                      <a href={`mailto:${item.value}`} className="text-slate-900 dark:text-white font-medium hover:text-sky-600 dark:hover:text-sky-400 truncate">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-slate-900 dark:text-white font-medium">
                        {item.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCv}
                className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Télécharger mon CV' : 'Download CV'}</span>
              </button>

              <a
                href="#contact-section"
                className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
              >
                <span>{lang === 'fr' ? 'Me contacter' : 'Contact Me'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
