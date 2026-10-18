import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface CounterSectionProps {
  lang: 'fr' | 'en';
}

export const CounterSection: React.FC<CounterSectionProps> = ({ lang }) => {
  return (
    <section id="section-counter" className="py-14 bg-[#0e1628] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.counters.map((item, idx) => (
            <div key={idx} className="counter-box">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-400 mb-2 font-heading">
                {item.value}
                <span className="text-slate-400 text-3xl">{item.suffix}</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                {item.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
