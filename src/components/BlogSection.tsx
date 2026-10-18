import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, MessageSquare, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA, BlogPost } from '@/data/portfolioData';
import { BlogModal } from '@/components/BlogModal';

interface BlogSectionProps {
  lang: 'fr' | 'en';
  posts?: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang, posts = PORTFOLIO_DATA.blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-24 bg-[#0e1628] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Articles & Veille' : 'Blog'}</span>
          <h2>{lang === 'fr' ? 'Mon Blog & Partages Techniques' : 'Our Blog'}</h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Retours d’expérience, analyses architecturales et bonnes pratiques de développement logiciel.'
              : 'Technical insights, real-world development experiences, and modern engineering practices.'}
          </p>
        </div>

        {/* 3 Blog Cards (Clyde style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-[#111827] rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              {/* Image banner */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.image}
                  alt={post.title[lang]}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 text-sky-400 text-[11px] font-semibold border border-slate-700 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-sky-400 transition-colors cursor-pointer leading-snug"
                  >
                    {post.title[lang]}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt[lang]}
                  </p>
                </div>

                {/* Footer Read More Button */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>{lang === 'fr' ? "Lire l'article" : 'Read More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs text-slate-500">
                    {post.commentsCount} {lang === 'fr' ? 'commentaires' : 'comments'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        lang={lang}
      />
    </section>
  );
};
