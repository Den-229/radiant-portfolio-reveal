import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MessageSquare, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeroProps {
  lang: 'fr' | 'en';
  onOpenCv: () => void;
  profile?: typeof PORTFOLIO_DATA.profile;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCv, profile = PORTFOLIO_DATA.profile }) => {

  // Typewriter effect phrases
  const titlesFr = [
    'Développeur Web & Mobile Full Stack',
    'Spécialiste Mobile Flutter (Android & iOS)',
    'Expert Backend Laravel & API REST',
    'Concepteur Logiciels Métiers & ERP WinDev',
  ];

  const titlesEn = [
    'Full Stack Web & Mobile Developer',
    'Flutter Mobile Specialist (iOS & Android)',
    'Laravel & REST API Backend Engineer',
    'Enterprise ERP & WinDev Developer',
  ];

  const titles = lang === 'fr' ? titlesFr : titlesEn;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex % titles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section id="home-section" className="relative min-h-[92vh] pt-32 pb-20 flex items-center bg-[#0b1120] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clyde HELLO! Subheading */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[4px] text-sky-400">
                HELLO!
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{profile.remoteStatus[lang]}</span>
              </div>
            </div>

            {/* Name & Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight">
                {lang === 'fr' ? 'Je suis ' : "I'm "}<span className="text-white">{profile.name}</span>
              </h1>

              {/* Typewriter text line (Clyde / DevFolio style) */}
              <div className="h-9 mt-2 flex items-center text-lg sm:text-2xl font-semibold text-sky-400">
                <span>{displayText}</span>
                <span className="typing-cursor" />
              </div>
            </div>

            {/* Authentic bio paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {profile.tagline[lang]}
            </p>

            {/* Quick meta (Location & Email) */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{profile.location} (GMT+1)</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{profile.email}</span>
              </div>
            </div>

            {/* CTA Buttons in Clyde style: HIRE ME & MY WORKS */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Me recruter / HIRE ME' : 'Hire Me'}</span>
              </a>

              <a
                href="#projects-section"
                className="px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>{lang === 'fr' ? 'Mes projets' : 'My Works'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCv}
                className="px-5 py-3.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>CV</span>
              </button>
            </div>

            {/* Social links row */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {lang === 'fr' ? 'Suivez-moi :' : 'Follow me :'}
              </span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Clean Portrait in ThemeWagon frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer clean frame */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl p-2">
                <div className="rounded-xl overflow-hidden bg-slate-950 aspect-[4/5] flex items-end justify-center">
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    className="w-full h-full object-contain object-bottom filter contrast-105"
                  />
                </div>
              </div>

              {/* Clean floating info badge */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-700 shadow-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-200">
                    {lang === 'fr' ? 'Profil vérifié & disponible' : 'Verified & Available'}
                  </span>
                </div>
                <span className="text-slate-400 font-medium">Bénin · Remote</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
