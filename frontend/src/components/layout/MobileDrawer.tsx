import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { portfolioData } from '../../data/portfolio';
import { cn } from '../../lib/utils';

export interface NavItem {
  number: string;
  label: string;
  href: string;
  id: string;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  returnFocusRef,
}) => {
  const [mounted] = useState(() => typeof document !== 'undefined');
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Derive transition state during render when isOpen changes
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    setIsTransitioning(true);
  }

  // Handle transition state for will-change optimization (active only during 280ms transition)
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 290);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // Lock body scroll, compensate scrollbar width, and add drawer-open class
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.classList.add('drawer-open');
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('drawer-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen, mounted]);

  // Focus management: move into drawer on open, return to trigger on close
  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      // Focus the close button when opened
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Return focus to hamburger button on close
      returnFocusRef?.current?.focus();
    }
  }, [isOpen, mounted, returnFocusRef]);

  // Handle Escape key and window resize to desktop (>= 1024px)
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, mounted, onClose]);

  // Trap focus inside drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();

    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  if (!mounted) return null;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Render Portal directly into document.body as a sibling of the app root
  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={cn(
        'lg:hidden fixed inset-0 pointer-events-none',
        isOpen ? 'pointer-events-auto' : ''
      )}
      style={{ zIndex: 60 }}
    >
      {/* Background Overlay: fixed, inset-0, rgba(0,0,0,0.5), no blur */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-280 ease-out',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Right-Side Drawer: fixed, top 0, right 0, bottom 0, 100dvh, width min(86vw, 340px) */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
        inert={!isOpen ? true : undefined}
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
          transition: prefersReduced
            ? 'none'
            : 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), visibility 280ms',
          willChange: isTransitioning ? 'transform' : 'auto',
          width: 'min(86vw, 340px)',
          height: '100dvh',
        }}
        className={cn(
          'fixed top-0 right-0 bottom-0 bg-(--color-surface) text-(--color-text) border-l border-(--color-border) shadow-2xl flex flex-col justify-between overflow-y-auto'
        )}
      >
        <div
          className="flex flex-col min-h-full p-5 sm:p-6"
          style={{
            paddingTop: 'max(1.25rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header Row: DM logo + Dhanush M on left, Close X button (44px) on right */}
          <div className="flex items-center justify-between pb-4 border-b border-(--color-border)">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-sans font-bold text-xs shadow-xs">
                DM
              </div>
              <span className="font-sans font-semibold text-base tracking-tight text-(--color-text)">
                Dhanush M
              </span>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-primary)"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Nav List: ALL links, large and clear (min-h-[56px], 18px Poppins 500) */}
          <nav className="py-4 space-y-1 flex-1" aria-label="Mobile and tablet navigation">
            <p className="text-[11px] font-mono uppercase tracking-widest text-(--color-muted) px-2 mb-2">
              Sections
            </p>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={cn(
                    'flex items-center gap-3.5 px-3.5 min-h-[56px] h-14 rounded-xl text-lg font-sans font-medium transition-all select-none border-b border-(--color-border)/60',
                    isActive
                      ? 'text-(--color-primary) font-semibold bg-(--color-primary)/10 border-l-[3px] border-l-(--color-primary) pl-3'
                      : 'text-(--color-text) hover:bg-(--color-surface-2) border-l-[3px] border-l-transparent'
                  )}
                >
                  <span className="font-mono text-xs text-(--color-muted) w-6 shrink-0">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Footer Area Pinned to Bottom (margin-top: auto) */}
          <div className="mt-auto pt-5 border-t border-(--color-border) space-y-4">
            {/* Full-width Download Resume button */}
            <Button
              href={portfolioData.resumeUrl}
              download="Dhanush_M_Resume.pdf"
              variant="primary"
              size="lg"
              icon={<FileDown className="w-4 h-4" />}
              className="w-full min-h-[48px]"
              onClick={onClose}
            >
              Download Resume
            </Button>

            {/* Theme Toggle Row labelled "Light / Dark" */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-(--color-surface-2) border border-(--color-border)">
              <span className="text-sm font-sans font-medium text-(--color-text)">
                Light / Dark Theme
              </span>
              <ThemeToggle />
            </div>

            {/* Social Icon Buttons (GitHub, LinkedIn, Email) */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                aria-label="Send Email"
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-center text-xs font-mono text-(--color-muted)">
              {portfolioData.location}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
