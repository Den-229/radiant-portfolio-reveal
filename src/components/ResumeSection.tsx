import React from 'react';
import { Briefcase, GraduationCap, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ResumeSectionProps {
  lang: 'fr' | 'en';
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ lang }) => {
  const { experiences } = PORTFOLIO_DATA;

  const education = [
    {
      degree: {
        fr: 'Licence Professionnelle en Génie Logiciel & Informatique',
        en: 'Bachelor of Science in Software Engineering',
      },
      school: 'Institut Supérieur d’Informatique & Télécoms',
      period: '2019 — 2022',
      location: 'Cotonou, Bénin',
      description: {
        fr: 'Bases solides en conception de systèmes d’information (Merise/UML), modélisation relationnelle de bases de données, programmation orientée objet et sécurité applicative.',
        en: 'Information systems modeling, relational database design (SQL/Merise), object-oriented programming, network architectures and application security.',
      },
    },
    {
      degree: {
        fr: 'Spécialisation Continue : Mobile Flutter & Architecture Laravel',
        en: 'Specialized Track: Flutter Mobile & Modern Laravel Architecture',
      },
      school: 'Auto-formation continue & Labs de production',
      period: '2022 — 2024',
      location: 'En ligne & Projets réels',
      description: {
        fr: 'Perfectionnement sur le framework Flutter (gestion d’état BLoC/Riverpod, offline-first), architectures API RESTful sécurisées, passerelles Mobile Money et intégration continue CI/CD.',
        en: 'Advanced Flutter state management (BLoC/Riverpod, offline caching), production REST APIs with Laravel, payment gateway integration, and automated CI/CD deployments.',
      },
    },
  ];

  return (
    <section id="parcours" className="py-24 bg-slate-50 dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="section-title-wrap">
          <h2>{lang === 'fr' ? 'Mon Parcours' : 'My Resume'}</h2>
          <p>
            {lang === 'fr'
              ? 'Une vue d’ensemble chronologique de mes expériences professionnelles et de mes diplômes.'
              : 'A chronological overview of my professional experiences, accomplishments and education.'}
          </p>
        </div>

        {/* 2 Columns: Education on left, Experience on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Column 1: Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-blue-950 border border-sky-200 dark:border-blue-800 flex items-center justify-center text-sky-600 dark:text-blue-500">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'fr' ? 'Formations & Diplômes' : 'Education'}
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-800 space-y-10 ml-4">
              {education.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#0b1120] border-2 border-sky-600 dark:border-blue-500" />

                  <span className="px-2.5 py-1 rounded bg-sky-50 dark:bg-blue-950 text-sky-700 dark:text-blue-400 text-xs font-semibold border border-sky-200 dark:border-blue-800/60 inline-block mb-2">
                    {item.period}
                  </span>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.degree[lang]}
                  </h4>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 mb-3">
                    {item.school} — {item.location}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-blue-950 border border-sky-200 dark:border-blue-800 flex items-center justify-center text-sky-600 dark:text-blue-500">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'fr' ? 'Expériences Professionnelles' : 'Work Experience'}
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-800 space-y-10 ml-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#0b1120] border-2 border-sky-600 dark:border-blue-500" />

                  <span className="px-2.5 py-1 rounded bg-sky-50 dark:bg-blue-950 text-sky-700 dark:text-blue-400 text-xs font-semibold border border-sky-200 dark:border-blue-800/60 inline-block mb-2">
                    {exp.period}
                  </span>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {exp.role[lang]}
                  </h4>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 mb-3">
                    {exp.company} — {exp.location}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {exp.description[lang]}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {exp.bullets[lang].map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
