import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { portfolioData } from '../../data/portfolio';
import { cn } from '../../lib/utils';

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
    <header className="sticky top-0 left-0 right-0 z-50 h-16 w-full border-b border-(--color-border)/80 bg-(--color-bg)/85 backdrop-blur-md transition-colors duration-200">
      <Container className="h-full flex items-center justify-between">
        {/* Logo Mark */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) rounded-[6px]"
          aria-label="Dhanush M - Back to top"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-heading font-bold text-base shadow-sm group-hover:scale-105 transition-transform duration-200">
            DM
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-(--color-text) hidden sm:inline-block">
            Dhanush<span className="text-(--color-primary)">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-[8px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
                  isActive
                    ? 'text-(--color-primary) bg-(--color-primary)/10 font-semibold'
                    : 'text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2)'
                )}
              >
                {item.label}
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
            className="inline-flex md:hidden items-center justify-center w-11 h-11 rounded-[10px] text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
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
            <p className="text-xs font-mono uppercase tracking-wider text-(--color-muted) px-3 mb-2">
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
                    'block px-4 py-3 rounded-[12px] text-base font-medium transition-colors',
                    isActive
                      ? 'bg-(--color-primary)/10 text-(--color-primary) font-semibold'
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
            <p className="text-center text-xs text-(--color-muted)">
              {portfolioData.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
