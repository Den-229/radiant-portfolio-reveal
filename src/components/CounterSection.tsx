import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface CounterSectionProps {
  lang: 'fr' | 'en';
}

export const CounterSection: React.FC<CounterSectionProps> = ({ lang }) => {
  return (
    <section id="section-counter" className="py-14 bg-slate-100/70 dark:bg-[#0e1628] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.counters.map((item, idx) => (
            <div key={idx} className="counter-box">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-600 dark:text-sky-400 mb-2 font-heading">
                {item.value}
                <span className="text-slate-400 dark:text-slate-500 text-3xl font-normal">{item.suffix}</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {item.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
