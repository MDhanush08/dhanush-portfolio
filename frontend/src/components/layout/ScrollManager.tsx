import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const prevPathRef = useRef(location.pathname)

  // Continuously record scroll position on Home and Projects pages
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const path = location.pathname
      if (path === '/') {
        try {
          sessionStorage.setItem('scroll_y_/', y.toString())
          sessionStorage.setItem('home_scroll_y', y.toString())
          sessionStorage.setItem('has_insite_history', 'true')
        } catch {
          // ignore storage errors
        }
      } else if (path === '/projects') {
        try {
          sessionStorage.setItem('scroll_y_/projects', y.toString())
          sessionStorage.setItem('has_insite_history', 'true')
        } catch {
          // ignore storage errors
        }
      }
    }

    if (location.pathname === '/' || location.pathname === '/projects') {
      try {
        sessionStorage.setItem('has_insite_history', 'true')
      } catch {
        // ignore
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    const isHome = location.pathname === '/'
    const isProjects = location.pathname === '/projects'
    const prevPath = prevPathRef.current
    const pathChanged = prevPath !== location.pathname

    // Save scroll position when leaving a page
    if (pathChanged) {
      try {
        sessionStorage.setItem(`scroll_y_${prevPath}`, window.scrollY.toString())
        if (prevPath === '/') {
          sessionStorage.setItem('home_scroll_y', window.scrollY.toString())
        }
      } catch {
        // ignore storage errors
      }
    }

    if (isHome) {
      if (location.hash) {
        // Handle hash anchor navigation on Home
        const targetId = location.hash.replace('#', '')
        const el = document.getElementById(targetId)
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' })
          }, 60)
        }
      } else if (navType === 'POP') {
        // Restore scroll position on back button
        try {
          const savedY = sessionStorage.getItem('scroll_y_/') || sessionStorage.getItem('home_scroll_y')
          if (savedY) {
            const targetY = parseInt(savedY, 10)
            window.scrollTo({
              top: targetY,
              behavior: 'instant' as ScrollBehavior,
            })
            requestAnimationFrame(() => {
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior })
            })
            setTimeout(() => {
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior })
            }, 60)
          }
        } catch {
          // ignore
        }
      } else if (pathChanged) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    } else if (isProjects) {
      if (navType === 'POP') {
        // Restore scroll position on back button
        try {
          const savedY = sessionStorage.getItem('scroll_y_/projects')
          if (savedY) {
            const targetY = parseInt(savedY, 10)
            window.scrollTo({
              top: targetY,
              behavior: 'instant' as ScrollBehavior,
            })
            requestAnimationFrame(() => {
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior })
            })
            setTimeout(() => {
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior })
            }, 60)
          }
        } catch {
          // ignore
        }
      } else if (pathChanged) {
        // Navigating to /projects scrolls to top instantly
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    } else if (pathChanged) {
      // Navigating to detail page scrolls to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }

    prevPathRef.current = location.pathname
  }, [location, navType])

  return null
}
