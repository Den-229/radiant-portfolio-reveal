import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Eye
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { ProjectModal } from '@/components/ProjectModal';

interface ProjectsSectionProps {
  lang: 'fr' | 'en';
  projects?: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, projects = PORTFOLIO_DATA.projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mobile' | 'web' | 'erp'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: { fr: 'Tous les projets', en: 'All Projects' } },
    { id: 'mobile', label: { fr: 'Mobile (Flutter)', en: 'Mobile (Flutter)' } },
    { id: 'web', label: { fr: 'Web & APIs (Laravel)', en: 'Web & APIs' } },
    { id: 'erp', label: { fr: 'ERP & Métiers (WinDev)', en: 'ERP & Systems' } },
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects-section" className="py-24 bg-[#0b1120] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-14">
          <span className="subheading">{lang === 'fr' ? 'Réalisations' : 'Accomplishments'}</span>
          <h2>{lang === 'fr' ? 'Mes Projets Récents' : 'Our Projects'}</h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Découvrez une sélection de mes réalisations concrètes : applications mobiles, plateformes web et ERP métiers.'
              : 'Explore a curated selection of my software builds across mobile, web platforms and enterprise ERPs.'}
          </p>
        </div>

        {/* Filter categories in Clyde style */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as 'all' | 'mobile' | 'web' | 'erp')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Project Cards Grid (DevFolio style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111827] rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              {/* Image preview */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 text-blue-400 text-[11px] font-semibold border border-slate-700 backdrop-blur-sm">
                    {project.categoryLabel[lang]}
                  </span>
                </div>

                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-md">
                    <Eye className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Voir les détails' : 'View Details'}</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 block mb-1">
                    {project.subtitle}
                  </span>
                  
                  <h3 
                    onClick={() => setActiveModalProject(project)}
                    className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description[lang]}
                  </p>
                </div>

                {/* Footer with tags & action */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white transition-colors"
                    aria-label="Voir le projet"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        lang={lang}
      />
    </section>
  );
};
