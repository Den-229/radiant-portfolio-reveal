import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  if (!project) return null;

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour Denis, j'ai vu votre projet "${project.title}" sur votre portfolio et je souhaite développer une solution similaire.`
    );
    window.open(`https://wa.me/2290196000000?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 transition-colors duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a]">
          <div>
            <span className="text-xs font-semibold text-sky-600 dark:text-blue-400 uppercase tracking-wider">
              {project.categoryLabel[lang]}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Project Image Preview */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[16/9] max-h-[320px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{m.label}</span>
                <span className="text-lg font-bold text-sky-600 dark:text-blue-400 mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              {lang === 'fr' ? 'Présentation du projet' : 'Project Overview'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description[lang]}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {lang === 'fr' ? 'Fonctionnalités Clés & Réalisations' : 'Key Engineering Features'}
            </h3>
            <div className="space-y-2">
              {project.features[lang].map((f, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              {lang === 'fr' ? 'Technologies Utilisées' : 'Technologies Used'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Échanger sur ce projet (WhatsApp)' : 'Discuss on WhatsApp'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
