import React from 'react';
import { X, Calendar, User, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { BlogPost, PORTFOLIO_DATA } from '@/data/portfolioData';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, lang }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {post.category}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {post.title[lang]}
          </h2>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-400" />
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] max-h-[320px]">
            <img
              src={post.image}
              alt={post.title[lang]}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {post.content[lang].map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Author footer box */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={PORTFOLIO_DATA.profile.portrait}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover object-top border border-slate-700"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{post.author}</h4>
                <p className="text-xs text-slate-400">Développeur Web & Mobile Full Stack</p>
              </div>
            </div>

            <a
              href={PORTFOLIO_DATA.profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>{lang === 'fr' ? 'Échanger avec Denis' : 'Contact Denis'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
