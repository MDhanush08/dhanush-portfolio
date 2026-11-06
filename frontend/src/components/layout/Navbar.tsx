import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeSection = useScrollSpy(
    navItems.map((item) => item.id),
    160
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 text-[var(--color-text)] focus-visible:outline-none"
            aria-label="Dhanush M - Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-all duration-300">
              <span className="font-mono font-black text-lg gradient-text tracking-tighter">
                DM
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] ring-2 ring-[var(--color-bg)] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight group-hover:text-[var(--color-primary)] transition-colors">
                {portfolioData.personal.name}
              </span>
              <span className="text-[11px] font-mono text-[var(--color-muted)] leading-none">
                Software Dev
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--color-surface)]/80 border border-[var(--color-border)] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200',
                    isActive
                      ? 'text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-xs'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Button
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              download="Dhanush_M_Resume.pdf"
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex text-xs"
            >
              Resume
            </Button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--color-primary)]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[var(--color-bg)]/95 backdrop-blur-xl border-t border-[var(--color-border)] px-6 py-8 transition-all duration-300 ease-in-out z-50 flex flex-col justify-between overflow-y-auto',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider mb-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl text-base font-heading font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--color-surface-2)] text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-3">
          <Button
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            download="Dhanush_M_Resume.pdf"
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            className="w-full justify-center"
          >
            Download Resume
          </Button>

          <p className="text-center text-xs font-mono text-[var(--color-muted)]">
            {portfolioData.personal.email}
          </p>
        </div>
      </div>
    </header>
  );
}
