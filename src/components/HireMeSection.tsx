import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HireMeSectionProps {
  lang: 'fr' | 'en';
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({ lang }) => {
  return (
    <section className="hireme-banner py-16 sm:py-20 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & CTA (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-200 dark:text-sky-400">
              {lang === 'fr' ? 'Disponible pour missions & CDI' : "I'm Available For Freelance Work"}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              {lang === 'fr' ? 'Vous avez un projet en tête ?' : 'Have a Project On Your Mind?'}
            </h2>

            <p className="text-sky-50 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {lang === 'fr'
                ? 'De l’application mobile Flutter prête pour les stores jusqu’à l’ERP complet sous Laravel ou WinDev, confiez-moi votre idée pour lui donner vie dans les meilleurs délais.'
                : 'From store-ready Flutter cross-platform mobile apps to full-scale Laravel or WinDev enterprise ERPs, let’s turn your idea into a high-performance digital product.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={PORTFOLIO_DATA.profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Me recruter / WhatsApp' : 'Hire Me'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact-section"
                className="px-6 py-3.5 rounded-lg border border-white/40 text-white hover:bg-white/10 dark:border-slate-600 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>{lang === 'fr' ? 'Formulaire de contact' : 'Send Message'}</span>
              </a>
            </div>
          </div>

          {/* Right: Portrait Cutout in Clyde style (4 cols) */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="relative w-64 h-72 flex items-end justify-center">
              <img
                src={PORTFOLIO_DATA.profile.portrait}
                alt={PORTFOLIO_DATA.profile.name}
                className="h-full object-contain object-bottom filter contrast-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
