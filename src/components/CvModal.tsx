import React from 'react';
import { 
  X, 
  Printer, 
  MapPin, 
  Mail, 
  Globe, 
  Linkedin, 
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const { profile, projects, experiences } = PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a] select-none print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              Curriculum Vitae — Denis ASSOGBA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Imprimer / Enregistrer PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0b1120] text-slate-200 print:bg-white print:text-black print:p-0">
          
          {/* Header of CV */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-800 print:border-gray-300">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight print:text-black">
                {profile.name}
              </h1>
              <p className="text-base font-semibold text-blue-400 mt-1 print:text-blue-600">
                {profile.role[lang]}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl print:text-gray-700">
                {profile.tagline[lang]}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-slate-300 print:text-gray-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 print:text-blue-600" />
                <span>{profile.location} (Disponible sur site & remote)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 print:text-blue-600" />
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 print:text-blue-600" />
                <span>WhatsApp : +229 01 96 00 00 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-blue-400 print:text-blue-600" />
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline truncate max-w-[220px]">
                  linkedin.com/in/denisassogba
                </a>
              </div>
            </div>
          </div>

          {/* Section: Core Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2 print:text-blue-700">
              <Layers className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Compétences Techniques Clés' : 'Key Technical Proficiencies'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 print:border-gray-200">
                <strong className="text-white block mb-1 print:text-black">📱 Développement Mobile :</strong>
                <p className="text-slate-300 print:text-gray-700">Flutter, Dart, Architecture BLoC / Riverpod, Offline First, Firebase Auth & Push, Déploiement Stores Google Play & App Store.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 print:border-gray-200">
                <strong className="text-white block mb-1 print:text-black">⚙️ Backend & APIs :</strong>
                <p className="text-slate-300 print:text-gray-700">Laravel (PHP 8+), REST APIs, JWT, Architecture MVC/Clean, Webhooks, Passerelles Mobile Money (MTN, Moov) & Stripe.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 print:border-gray-200">
                <strong className="text-white block mb-1 print:text-black">💻 Frontend Moderne :</strong>
                <p className="text-slate-300 print:text-gray-700">React, TypeScript, Tailwind CSS, Vite, HTML5 / CSS3 sémantique, Optimisation de performances.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 print:border-gray-200">
                <strong className="text-white block mb-1 print:text-black">🗄️ ERP, Métiers & Bases de données :</strong>
                <p className="text-slate-300 print:text-gray-700">WinDev, HFSQL Client/Serveur, MySQL, PostgreSQL, Modélisation relationnelle, Logiciels de Caisse & Gestion de Stock.</p>
              </div>
            </div>
          </div>

          {/* Section: Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2 print:text-blue-700">
              <Briefcase className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Expériences Professionnelles' : 'Professional Experience'}</span>
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500/40 pl-4 space-y-2 print:border-gray-300">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-white print:text-black">
                      {exp.role[lang]}
                    </h3>
                    <span className="text-xs text-blue-400 font-semibold print:text-blue-600">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 print:text-gray-600">
                    {exp.company} — {exp.location}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800 list-disc list-inside">
                    {exp.bullets[lang].map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2 print:text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Projets Majeurs Réalisés' : 'Key Delivered Projects'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 print:border-gray-200">
                  <div className="font-bold text-white print:text-black">{p.title}</div>
                  <div className="text-blue-400 text-[11px] print:text-blue-600">{p.subtitle}</div>
                  <p className="text-slate-400 mt-1 print:text-gray-700">{p.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="pt-4 border-t border-slate-800 print:border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2 print:text-blue-700">
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Formation Académique' : 'Education'}</span>
            </h2>
            <div className="text-xs space-y-1">
              <div className="flex justify-between items-baseline">
                <strong className="text-white print:text-black">Licence Professionnelle en Informatique & Génie Logiciel</strong>
                <span className="text-blue-400 print:text-blue-600">2019 — 2022</span>
              </div>
              <p className="text-slate-400 print:text-gray-600">Institut Supérieur d’Informatique & Télécoms (Bénin)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
