'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
  } catch (e) {
    console.error('Error reading theme from localStorage:', e);
  }
  
  return 'system';
}

function getInitialResolvedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  const savedTheme = getInitialTheme();
  
  if (savedTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return savedTheme as 'light' | 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (nextTheme: Theme, prefersDark: boolean) => {
      const nextResolved = nextTheme === 'system' ? (prefersDark ? 'dark' : 'light') : nextTheme;
      setResolvedTheme(nextResolved);

      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(nextResolved);
      root.style.colorScheme = nextResolved;
      
      // Store the theme preference
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (e) {
        console.error('Error saving theme to localStorage:', e);
      }
    };

    applyTheme(theme, mediaQuery.matches);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system', event.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, mounted]);

  const handleSetTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}