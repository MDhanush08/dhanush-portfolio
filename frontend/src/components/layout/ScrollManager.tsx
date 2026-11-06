import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    const isHome = location.pathname === '/'
    const wasHome = prevPathRef.current === '/'

    // Save scroll position when leaving home
    if (wasHome && !isHome) {
      try {
        sessionStorage.setItem('home_scroll_y', window.scrollY.toString())
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
          const savedY = sessionStorage.getItem('home_scroll_y')
          if (savedY) {
            window.scrollTo({
              top: parseInt(savedY, 10),
              behavior: 'instant' as ScrollBehavior,
            })
          }
        } catch {
          // ignore
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    } else {
      // Navigating to detail page scrolls to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }

    prevPathRef.current = location.pathname
  }, [location, navType])

  return null
}
