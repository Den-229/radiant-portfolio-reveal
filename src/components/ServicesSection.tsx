import React from 'react';
import { 
  Smartphone, 
  Globe, 
  Cpu, 
  Zap, 
  Database,
  Cloud,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  lang: 'fr' | 'en';
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const servicesList = [
    {
      id: 'srv-1',
      number: '01',
      title: { fr: 'Développement Mobile iOS & Android', en: 'iOS & Android Mobile Development' },
      icon: Smartphone,
      description: {
        fr: 'Applications mobiles natives 60 FPS sous Flutter avec gestion d’état robuste (Riverpod/BLoC), mode hors-ligne et publication optimisée sur Google Play & App Store.',
        en: 'High-performance cross-platform mobile apps with Flutter, responsive 60 FPS interfaces, offline persistence, and seamless store deployment.',
      },
      tags: ['Flutter', 'Dart', 'Firebase', 'Play Store', 'App Store'],
    },
    {
      id: 'srv-2',
      number: '02',
      title: { fr: 'Applications Web & Backends API REST', en: 'Web Apps & RESTful API Backends' },
      icon: Globe,
      description: {
        fr: 'Développement de plateformes web rapides et sécurisées avec Laravel 10 et React. Backends robustes, dashboards d’administration et architecture API documentée.',
        en: 'Scalable web applications and secure API architectures built with Laravel and React. Clean routing, fast caching, and documented endpoints.',
      },
      tags: ['Laravel 10', 'PHP 8', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 'srv-3',
      number: '03',
      title: { fr: 'Solutions Métiers & ERP sur Mesure', en: 'Custom Enterprise ERPs & Software' },
      icon: Cpu,
      description: {
        fr: 'Digitalisation sur mesure des opérations d’entreprise : gestion scolaire, gestion des stocks multi-magasins, facturation et logiciels de caisse sous WinDev ou le web.',
        en: 'Custom automation for company operations: school management, multi-warehouse stock tracking, invoicing, and POS software built with WinDev or web stacks.',
      },
      tags: ['ERP', 'Stock', 'Gestion Scolaire', 'WinDev', 'HFSQL'],
    },
    {
      id: 'srv-4',
      number: '04',
      title: { fr: 'Intégrations d’APIs & Paiements Mobile Money', en: 'API Integrations & Mobile Money Gateways' },
      icon: Zap,
      description: {
        fr: 'Connexion de passerelles de paiement locales d’Afrique de l’Ouest (MTN Mobile Money, Moov Money) et internationales (Stripe), gestion des webhooks et notifications.',
        en: 'Flawless integration of African Mobile Money providers (MTN MoMo, Moov) and international gateways (Stripe) with cryptographic signature validation.',
      },
      tags: ['MTN MoMo', 'Moov Money', 'Stripe', 'Webhooks', 'REST API'],
    },
    {
      id: 'srv-5',
      number: '05',
      title: { fr: 'Bases de Données & Modélisation Relationnelle', en: 'Relational Database Architecture' },
      icon: Database,
      description: {
        fr: 'Conception et optimisation de bases de données relationnelles MySQL, PostgreSQL et HFSQL. Indexation avancée, procédures stockées et intégrité transactionnelle ACID.',
        en: 'Normalized relational database schemas, index tuning, stored procedures, and ACID transactional integrity across MySQL, PostgreSQL, and HFSQL.',
      },
      tags: ['MySQL', 'HFSQL', 'PostgreSQL', 'SQL Optimization'],
    },
    {
      id: 'srv-6',
      number: '06',
      title: { fr: 'Déploiement Cloud, VPS & Maintenance', en: 'Cloud Deployment & DevOps Maintenance' },
      icon: Cloud,
      description: {
        fr: 'Déploiement sur serveurs Linux VPS (Nginx, Docker), configuration SSL, sauvegardes automatisées et maintenance corrective et évolutive continue.',
        en: 'Linux VPS server deployments (Nginx, Docker), SSL certificate hardening, automated backups, and proactive software maintenance.',
      },
      tags: ['Linux VPS', 'Nginx', 'Docker', 'Git / CI-CD', 'Maintenance'],
    },
  ];

  return (
    <section id="services-section" className="py-24 bg-slate-50 dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Mes Spécialités' : 'I am great at'}</span>
          <h2>{lang === 'fr' ? 'Des Services Conçus Pour Vos Besoins' : 'We do awesome services for our clients'}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Un accompagnement de bout en bout pour concevoir, développer et déployer vos solutions digitales.'
              : 'End-to-end technical expertise to architect, develop and ship reliable software systems.'}
          </p>
        </div>

        {/* 6 Cards Grid (Clyde style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-md dark:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-xl bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white dark:group-hover:text-slate-950 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-slate-300 dark:text-slate-700">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400 transition-colors">
                    {service.title[lang]}
                  </h3>

                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {service.description[lang]}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectService(service.title[lang])}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                  >
                    <span>{lang === 'fr' ? 'Demander ce service' : 'Request Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
