import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, MessageSquare, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenCv }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home-section', label: { fr: 'Accueil', en: 'Home' } },
    { href: '#about-section', label: { fr: 'À propos', en: 'About' } },
    { href: '#skills-section', label: { fr: 'Compétences', en: 'Skills' } },
    { href: '#services-section', label: { fr: 'Services', en: 'Services' } },
    { href: '#projects-section', label: { fr: 'Projets', en: 'Projects' } },
    { href: '#blog-section', label: { fr: 'Blog', en: 'My Blog' } },
    { href: '#contact-section', label: { fr: 'Contact', en: 'Contact' } },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md shadow-xs dark:shadow-lg border-b border-slate-200 dark:border-slate-800 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a
            href="#home-section"
            onClick={(e) => handleNavClick(e, '#home-section')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Denis<span className="text-sky-600 dark:text-sky-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                {link.label[lang]}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle, CV, Language, WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle (Dark / Light / System) */}
            <ThemeToggle lang={lang} variant="compact" />

            {/* Lang switch */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-xs"
              title="Changer de langue / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* CV Button */}
            <button
              onClick={onOpenCv}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              <span>CV</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={PORTFOLIO_DATA.profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Me contacter' : 'Contact Me'}</span>
            </a>
          </div>

          {/* Mobile header controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme toggle mobile compact */}
            <ThemeToggle lang={lang} variant="compact" />

            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-3 pb-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {link.label[lang]}
              </a>
            ))}

            {/* Mobile Theme selector full width */}
            <div className="pt-3 pb-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {lang === 'fr' ? 'Thème d’affichage :' : 'Theme :'}
              </span>
              <ThemeToggle lang={lang} variant="segmented" />
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenCv();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                <span>{lang === 'fr' ? 'Voir mon CV' : 'View Resume'}</span>
              </button>

              <a
                href={PORTFOLIO_DATA.profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-sky-600 text-white text-center text-xs font-semibold shadow-sm"
              >
                {lang === 'fr' ? 'WhatsApp Direct' : 'WhatsApp Chat'}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
