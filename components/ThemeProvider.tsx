'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'paper' | 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'paper', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('paper');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved && ['paper', 'light', 'dark'].includes(saved)) {
        setThemeState(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'paper') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
