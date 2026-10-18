import React from 'react';
import { ArrowUp, Github, Linkedin, MessageSquare, Mail, MapPin, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface FooterProps {
  lang: 'fr' | 'en';
  onOpenCv: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenCv, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070b14] pt-20 pb-12 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 4 Columns (Clyde ftco-footer style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Column 1: About Clyde / Denis */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading text-white">
              Denis<span className="text-sky-400">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {lang === 'fr'
                ? 'Développeur Full Stack Web & Mobile basé au Bénin. Spécialisé en Flutter, Laravel, React et solutions métiers ERP.'
                : 'Full Stack Web & Mobile Engineer based in Benin. Specializing in Flutter, Laravel, React and enterprise ERPs.'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white">
              {lang === 'fr' ? 'Navigation' : 'Links'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#home-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ Accueil' : '→ Home'}
                </a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ À propos' : '→ About'}
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ Services' : '→ Services'}
                </a>
              </li>
              <li>
                <a href="#projects-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ Projets' : '→ Projects'}
                </a>
              </li>
              <li>
                <a href="#blog-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ Mon Blog' : '→ My Blog'}
                </a>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-sky-400 transition-colors">
                  {lang === 'fr' ? '→ Contact' : '→ Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="text-slate-400">
                {lang === 'fr' ? '• Apps Mobiles Flutter' : '• Mobile Apps (Flutter)'}
              </li>
              <li className="text-slate-400">
                {lang === 'fr' ? '• Backends Laravel & APIs' : '• Laravel & REST APIs'}
              </li>
              <li className="text-slate-400">
                {lang === 'fr' ? '• ERP & Gestion de Stock' : '• Enterprise ERP & Stock'}
              </li>
              <li className="text-slate-400">
                {lang === 'fr' ? '• Solutions WinDev & POS' : '• WinDev & POS Software'}
              </li>
              <li className="text-slate-400">
                {lang === 'fr' ? '• Paiements Mobile Money' : '• Mobile Money Gateways'}
              </li>
            </ul>
          </div>

          {/* Column 4: Have a Questions? (Clyde exact column) */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white">
              {lang === 'fr' ? 'Une Question ?' : 'Have a Questions?'}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-1 flex-shrink-0" />
                <span>{PORTFOLIO_DATA.profile.location} (Disponible à distance)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={PORTFOLIO_DATA.profile.whatsapp} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                  +229 01 96 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="hover:text-sky-400 truncate max-w-[200px]">
                  {PORTFOLIO_DATA.profile.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top in Clyde style */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <p>
              Copyright © {new Date().getFullYear()} All rights reserved | Denis ASSOGBA
            </p>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-sky-400 underline transition-colors"
            >
              Administration
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Haut de page"
          >
            <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp className="w-4 h-4 text-sky-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
