import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative inline-flex items-center justify-center w-11 h-11 rounded-[10px] text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary)/50 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
        className
      )}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-200" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-(--color-primary) transition-transform duration-200" aria-hidden="true" />
      )}
    </button>
  );
};
