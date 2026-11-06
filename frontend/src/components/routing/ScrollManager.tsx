import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollManager: React.FC = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const prevPathnameRef = useRef(location.pathname);

  // Save home scroll position on page unload as well
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem('home_scroll_y', String(window.scrollY));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = location.pathname;

    // Save scroll position whenever leaving home page
    if (prevPathname === '/' && location.pathname !== '/') {
      sessionStorage.setItem('home_scroll_y', String(window.scrollY));
    }

    // 1. Navigating to project detail page: scroll to top instantly
    if (location.pathname.startsWith('/projects')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // 2. On Home page:
    if (location.pathname === '/') {
      // If there is an anchor hash (/#about, /#skills, /#projects, etc.)
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const timer = setTimeout(() => {
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({
              behavior: prevPathname === '/' ? 'smooth' : 'auto',
              block: 'start',
            });
          }
        }, 50);
        return () => clearTimeout(timer);
      }

      // If returning from another page via browser back button (POP navigation)
      if (navType === 'POP') {
        const saved = sessionStorage.getItem('home_scroll_y');
        if (saved) {
          const y = parseInt(saved, 10);
          if (!isNaN(y)) {
            const timer = setTimeout(() => {
              window.scrollTo({ top: y, left: 0, behavior: 'instant' });
            }, 30);
            return () => clearTimeout(timer);
          }
        }
      } else {
        // Direct navigation to home root
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname, location.hash, navType]);

  return null;
};
