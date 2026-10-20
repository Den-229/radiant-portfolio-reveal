import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from '@/lib/theme';

interface ThemeToggleProps {
  lang?: 'fr' | 'en';
  variant?: 'segmented' | 'compact' | 'footer';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  lang = 'fr',
  variant = 'segmented',
  className = '',
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const options: { id: ThemeMode; label: { fr: string; en: string }; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'dark',
      label: { fr: 'Sombre', en: 'Dark' },
      icon: Moon,
    },
    {
      id: 'light',
      label: { fr: 'Clair', en: 'Light' },
      icon: Sun,
    },
    {
      id: 'system',
      label: { fr: 'Système', en: 'System' },
      icon: Monitor,
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <div
          role="radiogroup"
          aria-label={lang === 'fr' ? 'Sélecteur de thème' : 'Theme selector'}
          className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs"
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(opt.id)}
                title={opt.label[lang]}
                className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-xs scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="sr-only">{opt.label[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex flex-col sm:flex-row items-center gap-2 ${className}`}>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {lang === 'fr' ? 'Thème d’affichage :' : 'Display theme :'}
        </span>
        <div
          role="radiogroup"
          aria-label={lang === 'fr' ? 'Sélecteur de thème' : 'Theme selector'}
          className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80"
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(opt.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-white dark:bg-sky-500 text-slate-900 dark:text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default segmented control with labels
  return (
    <div
      role="radiogroup"
      aria-label={lang === 'fr' ? 'Sélecteur de thème (Sombre, Clair, Système)' : 'Theme selector (Dark, Light, System)'}
      className={`flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs ${className}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setTheme(opt.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              isSelected
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{opt.label[lang]}</span>
          </button>
        );
      })}
    </div>
  );
};
