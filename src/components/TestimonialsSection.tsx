import React from 'react';
import { Star, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface TestimonialsSectionProps {
  lang: 'fr' | 'en';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  return (
    <section id="testimony-section" className="py-24 bg-[#0e1628] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Clyde Heading Section */}
        <div className="heading-section text-center mb-16">
          <span className="subheading">{lang === 'fr' ? 'Témoignages' : 'Testimonies'}</span>
          <h2>{lang === 'fr' ? 'Ce que disent mes clients' : 'What client says about?'}</h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Ce que disent les directeurs, gestionnaires et partenaires avec qui j’ai collaboré.'
              : 'Feedback from directors, operations leads, and clients who trust my software.'}
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#111827] p-8 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-md"
            >
              <div>
                <Quote className="w-8 h-8 text-blue-500/40 mb-4" />

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{test.content[lang]}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {test.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {test.role} · {test.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
