import React, { useState, useEffect, useRef } from 'react';
import { FileDown } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { portfolioData } from '../../data/portfolio';
import { cn } from '../../lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

interface NavItem {
  number: string;
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: '01', label: 'About', href: '#about', id: 'about' },
  { number: '02', label: 'Skills', href: '#skills', id: 'skills' },
  { number: '03', label: 'Experience', href: '#experience', id: 'experience' },
  { number: '04', label: 'Projects', href: '#projects', id: 'projects' },
  { number: '05', label: 'Contact', href: '#contact', id: 'contact' },
];

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((item) => item.id)];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 'hero');

  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Scroll direction auto-hide & top progress bar scrub
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Top scroll-progress bar scrub
        if (progressBarRef.current) {
          gsap.fromTo(
            progressBarRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.1,
              },
            }
          );
        }

        // Auto-hide on scroll down, show on scroll up (translateY only)
        if (headerRef.current) {
          let lastScrollY = window.scrollY;

          const scrollTriggerInstance = gsap.timeline({
            scrollTrigger: {
              start: 'top top',
              end: 'max',
              onUpdate: (self) => {
                const currentScrollY = self.scroll();
                // When mobile menu is open, never hide navbar
                if (mobileMenuOpen) return;

                if (currentScrollY > 120 && currentScrollY > lastScrollY) {
                  gsap.to(headerRef.current, {
                    yPercent: -100,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                } else if (currentScrollY < lastScrollY) {
                  gsap.to(headerRef.current, {
                    yPercent: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
                lastScrollY = currentScrollY;
              },
            },
          });

          return () => {
            scrollTriggerInstance.kill();
          };
        }
      });
    },
    { scope: headerRef, dependencies: [mobileMenuOpen] }
  );

  // Lock body scroll and manage focus when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Move focus into menu
      const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>('a');
      setTimeout(() => firstLink?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key, outside click, or window resize to >= 1024px
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Trap focus inside menu when open
  useEffect(() => {
    if (!mobileMenuOpen || !menuPanelRef.current) return;

    const focusable = menuPanelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      hamburgerBtnRef.current?.focus();
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 right-0 z-50 h-16 w-full border-b border-(--color-border)/80 bg-(--color-bg)/85 backdrop-blur-md transition-colors duration-200"
    >
      {/* Top Scroll Progress Line (scaleX scrubbed) */}
      <div
        ref={progressBarRef}
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-(--color-primary) to-(--color-secondary) origin-left z-50 pointer-events-none"
      />

      <Container className="h-full flex items-center justify-between">
        {/* Logo Mark */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) rounded-lg"
          aria-label="Dhanush M - Home"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-sans font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
            DM
          </div>
          <span className="font-sans font-semibold text-base sm:text-lg tracking-tight text-(--color-text)">
            Dhanush<span className="text-(--color-primary)">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation (1024px and above) */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
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
              </a>
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
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden flex flex-col items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-(--color-surface-2) border border-(--color-border) text-(--color-text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) cursor-pointer select-none transition-colors"
          >
            {/* 3 lines morphing to X using transform only */}
            <span
              className={cn(
                'w-5 h-[2px] bg-(--color-text) rounded-full transition-transform duration-200 ease-out',
                mobileMenuOpen && 'rotate-45 translate-y-[6px]'
              )}
            />
            <span
              className={cn(
                'w-5 h-[2px] bg-(--color-text) rounded-full my-[4px] transition-opacity duration-150',
                mobileMenuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-5 h-[2px] bg-(--color-text) rounded-full transition-transform duration-200 ease-out',
                mobileMenuOpen && '-rotate-45 -translate-y-[6px]'
              )}
            />
          </button>
        </div>
      </Container>

      {/* Opened Mobile & Tablet Menu (Below 1024px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          ref={menuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-(--color-surface) border-t border-(--color-border) shadow-2xl overflow-y-auto px-5 py-6 flex flex-col justify-between transition-all duration-200"
        >
          {/* Menu links as big tap rows (min 52px height, 18px Poppins 500) */}
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-(--color-muted) px-2 mb-3">
              Navigation Menu
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'flex items-center gap-3 px-4 min-h-[52px] h-[52px] rounded-xl text-lg font-sans font-medium transition-all select-none',
                    isActive
                      ? 'bg-(--color-primary)/10 text-(--color-primary) font-semibold border-l-4 border-(--color-primary)'
                      : 'text-(--color-text) hover:bg-(--color-surface-2) border-l-4 border-transparent'
                  )}
                >
                  <span className="font-mono text-xs text-(--color-muted) w-6">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Bottom Controls: Resume button (full width) + Theme Toggle row */}
          <div className="pt-6 border-t border-(--color-border) space-y-4">
            <Button
              href={portfolioData.resumeUrl}
              download="Dhanush_M_Resume.pdf"
              variant="primary"
              size="lg"
              icon={<FileDown className="w-4 h-4" />}
              className="w-full min-h-[48px]"
              onClick={handleNavClick}
            >
              Download Resume
            </Button>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border)">
              <span className="text-sm font-sans font-medium text-(--color-text)">
                Appearance Theme
              </span>
              <ThemeToggle />
            </div>

            <p className="text-center text-xs font-mono text-(--color-muted)">
              {portfolioData.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
