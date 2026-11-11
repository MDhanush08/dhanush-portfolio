import { useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'light' || current === 'dark') return current
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
    } catch {
      // localStorage may fail in private mode
    }
    return 'light'
  })

  const applyTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    try {
      localStorage.setItem('theme', newTheme)
      const meta = document.getElementById('theme-color-meta')
      if (meta) {
        meta.setAttribute('content', newTheme === 'dark' ? '#12100C' : '#FAF7F0')
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, [])

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, applyTheme])

  return { theme, toggleTheme, setTheme: applyTheme }
}
