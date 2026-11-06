import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileDown } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { portfolioData } from '../../data/portfolio';
import { cn } from '../../lib/utils';
import { MobileDrawer } from './MobileDrawer';

interface NavItem {
  number: string;
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: '01', label: 'About', href: '/#about', id: 'about' },
  { number: '02', label: 'Skills', href: '/#skills', id: 'skills' },
  { number: '03', label: 'Experience', href: '/#experience', id: 'experience' },
  { number: '04', label: 'Projects', href: '/#projects', id: 'projects' },
  { number: '05', label: 'Contact', href: '/#contact', id: 'contact' },
];

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((item) => item.id)];

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const scrollSpySection = useScrollSpy(SECTION_IDS, 'hero');

  // On home page, activeSection follows scroll-spy; on project detail page, only 'projects' is active
  const activeSection = isHome
    ? scrollSpySection
    : location.pathname.startsWith('/projects')
    ? 'projects'
    : '';

  const headerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // Soft shadow toggle via 8px top IntersectionObserver sentinel (zero scroll listeners)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (isHome) {
      e.preventDefault();
      const target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', item.href);
      }
    }
  };

  return (
    <>
      {/* 8px Sentinel placed at top of document for zero-listener shadow detection */}
      <div
        ref={sentinelRef}
        className="absolute top-0 left-0 w-full h-2 pointer-events-none -z-50"
        aria-hidden="true"
      />

      {/* Fixed Navbar (Always visible at all times, never hides) */}
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-16 w-full border-b bg-(--color-bg)/95 backdrop-blur-[8px] transition-[border-color,box-shadow,background-color] duration-200',
          isScrolled
            ? 'border-(--color-border) shadow-md'
            : 'border-(--color-border)/70 shadow-none'
        )}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Logo Mark */}
          <Link
            to="/#hero"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
              }
            }}
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) rounded-lg"
            aria-label="Dhanush M - Home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-sans font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
              DM
            </div>
            <span className="font-sans font-semibold text-base sm:text-lg tracking-tight text-(--color-text)">
              Dhanush<span className="text-(--color-primary)">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation (1024px and above) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
                    isActive
                      ? 'text-(--color-primary) font-semibold'
                      : 'text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2)'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-(--color-primary) to-(--color-secondary) rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Theme Toggle & Resume */}
            <div className="hidden lg:flex items-center gap-2.5">
              <ThemeToggle />
              <Button
                href={portfolioData.resumeUrl}
                download="Dhanush_M_Resume.pdf"
                variant="secondary"
                size="sm"
                icon={<FileDown className="w-4 h-4 text-(--color-primary)" />}
                aria-label="Download Dhanush M Resume PDF"
              >
                Resume
              </Button>
            </div>

            {/* Hamburger button (below 1024px: all phones & tablets) */}
            <button
              ref={hamburgerBtnRef}
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden flex flex-col items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-(--color-surface-2) border border-(--color-border) text-(--color-text) hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) cursor-pointer select-none transition-colors"
            >
              {/* 3 lines morphing to X using transform and opacity only */}
              <span
                className={cn(
                  'w-5 h-[2px] bg-(--color-text) rounded-full transition-transform duration-200 ease-out origin-center',
                  drawerOpen && 'rotate-45 translate-y-[6px]'
                )}
              />
              <span
                className={cn(
                  'w-5 h-[2px] bg-(--color-text) rounded-full my-[4px] transition-opacity duration-150',
                  drawerOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-5 h-[2px] bg-(--color-text) rounded-full transition-transform duration-200 ease-out origin-center',
                  drawerOpen && '-rotate-45 -translate-y-[6px]'
                )}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* 64px Spacer to prevent page content from being hidden behind fixed navbar */}
      <div className="h-16 w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Right-Side Drawer rendered into document.body via React Portal */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        returnFocusRef={hamburgerBtnRef}
      />
    </>
  );
};
