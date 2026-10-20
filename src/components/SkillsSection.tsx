import React from 'react';
import { Smartphone, Server, Database } from 'lucide-react';

interface SkillsSectionProps {
  lang: 'fr' | 'en';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const skillsList = [
    { name: 'Flutter & Dart (iOS & Android)', level: 92, category: 'Mobile' },
    { name: 'Laravel 10 & PHP 8 (REST APIs)', level: 95, category: 'Backend' },
    { name: 'React & TypeScript', level: 88, category: 'Frontend' },
    { name: 'MySQL & PostgreSQL', level: 90, category: 'Database' },
    { name: 'WinDev & HFSQL (ERP, Caisse)', level: 88, category: 'Desktop & Métier' },
    { name: 'Mobile Money (MTN MoMo & Moov) & Stripe', level: 92, category: 'Fintech' },
  ];

  const highlights = [
    {
      icon: Smartphone,
      title: { fr: 'Mobile Cross-Platform', en: 'Cross-Platform Mobile' },
      desc: {
        fr: 'Applications natives 60 FPS avec gestion d’état avancée (Riverpod/BLoC) et synchronisation hors-ligne.',
        en: 'Fluid 60 FPS mobile applications with advanced state management and offline persistence.',
      },
    },
    {
      icon: Server,
      title: { fr: 'Backends & APIs Sécurisées', en: 'Secure Backends & APIs' },
      desc: {
        fr: 'Architectures RESTful documentées, authentification JWT/Sanctum, files de traitement asynchrones.',
        en: 'Documented RESTful architectures, JWT/Sanctum security, asynchronous queues and webhook listeners.',
      },
    },
    {
      icon: Database,
      title: { fr: 'ERP & Solutions Métiers', en: 'Enterprise ERPs' },
      desc: {
        fr: 'Logiciels de gestion scolaire, stocks multi-magasins et caisses enregistreuses sous WinDev/Laravel.',
        en: 'School ERPs, multi-warehouse inventory systems, and high-speed POS cashier software.',
      },
    },
  ];

  return (
    <section id="skills-section" className="py-24 bg-slate-100/70 dark:bg-[#0e1628] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Compétences' : 'Skills'}</span>
          <h2>{lang === 'fr' ? 'Mes Compétences Techniques' : 'My Skills'}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Une maîtrise rigoureuse des technologies actuelles pour concevoir des systèmes stables et rapides.'
              : 'Rigorous mastery of modern software engineering stacks for robust and scalable architectures.'}
          </p>
        </div>

        {/* 2-Column Progress Bars (Clyde style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 mb-16">
          {skillsList.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 inline-block" />
                  {skill.name}
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300/60 dark:border-slate-700/60">
                <div
                  className="h-full rounded-full bg-sky-600 dark:bg-sky-500 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 3 Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-lg bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title[lang]}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc[lang]}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
