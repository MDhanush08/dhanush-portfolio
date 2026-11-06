import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'light' || current === 'dark') return current
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme')
      if (!stored) {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [applyTheme])

  return { theme, toggleTheme, setTheme: applyTheme }
}
