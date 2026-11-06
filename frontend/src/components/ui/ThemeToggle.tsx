import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300',
        'bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)]',
        'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
        className
      )}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={cn(
            'w-5 h-5 transition-transform duration-300 absolute',
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-amber-500'
          )}
        />
        <Moon
          className={cn(
            'w-5 h-5 transition-transform duration-300 absolute',
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-[var(--color-secondary)]'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          )}
        />
      </div>
    </button>
  );
}
