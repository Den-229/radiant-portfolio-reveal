import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'denis_portfolio_theme';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to determine system preference safely (SSR-compatible)
const getSystemPreference = (): ResolvedTheme => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark'; // Safe fallback
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper to get initial stored theme
// MANDATORY RULE: Dark is the required initial value when NO preference exists.
// Never confuse default with System mode: OS must NOT impose Light on first visit.
const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore localStorage errors (e.g. sandboxed iframe restrictions)
  }
  return 'dark'; // Mandatory initial default
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemPreference);

  // Calculate resolved theme
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Apply theme to HTML root element
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [resolvedTheme]);

  // Listen to OS system preference changes (reactive when in system mode)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystem = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Initialize state
    updateSystem(mediaQuery);

    const listener = (e: MediaQueryListEvent) => updateSystem(e);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      // Legacy browsers support
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore storage write errors
    }
  };

  const cycleTheme = () => {
    const cycleMap: Record<ThemeMode, ThemeMode> = {
      dark: 'light',
      light: 'system',
      system: 'dark',
    };
    setTheme(cycleMap[theme]);
  };

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      cycleTheme,
    }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
