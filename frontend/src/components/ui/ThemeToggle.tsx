import { memo } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = memo(function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2',
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200" />
      )}
    </button>
  )
})
