import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { portfolioData } from '../../data/portfolio';
import { cn } from '../../lib/utils';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((item) => item.id)];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 'hero');

  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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
                  // Scrolling down -> hide navbar
                  gsap.to(headerRef.current, {
                    yPercent: -100,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                } else if (currentScrollY < lastScrollY) {
                  // Scrolling up -> reveal navbar
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
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
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-display font-bold text-base shadow-sm group-hover:scale-105 transition-transform duration-200">
            DM
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-(--color-text) hidden sm:inline-block">
            Dhanush<span className="text-(--color-primary)">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation with Animated Indicator */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'relative px-3.5 py-1.5 text-xs font-mono tracking-wide uppercase rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
                  isActive
                    ? 'text-(--color-primary) font-semibold'
                    : 'text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2)'
                )}
              >
                <span>{item.label}</span>
                {/* Animated Active Indicator Pill/Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-(--color-primary) to-(--color-secondary) rounded-full animate-in fade-in duration-200" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Resume Download Button */}
          <Button
            href={portfolioData.resumeUrl}
            download="Dhanush_M_Resume.pdf"
            variant="secondary"
            size="sm"
            icon={<FileDown className="w-4 h-4 text-(--color-primary)" />}
            className="hidden sm:inline-flex"
            aria-label="Download Dhanush M Resume PDF"
          >
            Resume
          </Button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex md:hidden items-center justify-center w-11 h-11 rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Accessible Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-(--color-bg) border-t border-(--color-border) overflow-y-auto px-5 py-6 flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-(--color-muted) px-3 mb-2">
              Navigation
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-base font-display font-medium transition-colors',
                    isActive
                      ? 'bg-(--color-primary)/10 text-(--color-primary) font-bold'
                      : 'text-(--color-text) hover:bg-(--color-surface-2)'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-(--color-border) space-y-3">
            <Button
              href={portfolioData.resumeUrl}
              download="Dhanush_M_Resume.pdf"
              variant="primary"
              size="md"
              icon={<FileDown className="w-4 h-4" />}
              className="w-full"
              onClick={handleNavClick}
            >
              Download Resume
            </Button>
            <p className="text-center text-xs font-mono text-(--color-muted)">
              {portfolioData.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
