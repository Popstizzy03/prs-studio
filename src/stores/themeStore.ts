import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) return stored;
    return 'system';
  }
  return 'system';
};

export const theme = writable<Theme>(getInitialTheme());

export const toggleTheme = (newTheme: Theme) => {
  theme.set(newTheme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }
};

export const applyTheme = (currentTheme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = currentTheme === 'dark' || (currentTheme === 'system' && systemDark);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

// Initialize immediately to avoid flash
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme());
  
  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
      applyTheme('system');
    }
  });
}
