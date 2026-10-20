import React from 'react';
import { Star, Quote } from 'lucide-react';
import { PORTFOLIO_DATA, Testimonial } from '@/data/portfolioData';

interface TestimonialsSectionProps {
  lang: 'fr' | 'en';
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang, testimonials }) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : PORTFOLIO_DATA.testimonials;
  return (
    <section id="testimony-section" className="py-24 bg-slate-100/70 dark:bg-[#0e1628] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Témoignages' : 'Testimonies'}</span>
          <h2>{lang === 'fr' ? 'Ce que disent mes clients' : 'What client says about?'}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Ce que disent les directeurs, gestionnaires et partenaires avec qui j’ai collaboré.'
              : 'Feedback from directors, operations leads, and clients who trust my software.'}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((test) => {
            const quoteText =
              (test.content && test.content[lang]) ||
              test.content?.fr ||
              test.content?.en ||
              '';
            const starCount = Math.max(1, Math.min(5, test.rating || 5));
            const initial = (test.name || 'C').trim().charAt(0).toUpperCase() || 'C';

            return (
              <div
                key={test.id}
                className="bg-white dark:bg-[#111827] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-md dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div>
                  <Quote className="w-8 h-8 text-sky-500/40 dark:text-sky-400/40 mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(starCount)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-xs">
                    {initial}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {test.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {test.role} {test.company ? `· ${test.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
