import React, { useRef } from 'react';
import { Container } from './Container';
import { portfolioData } from '../../data/portfolio';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../lib/gsap';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!wordmarkRef.current) return;

        const split = new SplitText(wordmarkRef.current, {
          type: 'chars',
          charsClass: 'inline-block overflow-hidden',
        });

        gsap.fromTo(
          split.chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );

        return () => split.revert();
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (wordmarkRef.current) wordmarkRef.current.style.opacity = '1';
      });
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer ref={footerRef} className="w-full border-t border-(--color-border) bg-(--color-surface) pt-14 pb-10 transition-colors duration-200 overflow-hidden">
      <Container className="space-y-12">
        {/* Oversized "DHANUSH M" Wordmark with Character Reveal */}
        <div className="overflow-hidden py-2 text-center select-none">
          <div
            ref={wordmarkRef}
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl tracking-tighter text-(--color-text)/90 inline-block"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 9.5rem)' }}
          >
            DHANUSH <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-(--color-secondary)">M</span>
          </div>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-(--color-border)/80 text-xs font-mono text-(--color-muted)">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>© {CURRENT_YEAR} Dhanush M. Designed &amp; engineered for 60fps performance.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-(--color-text) transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-(--color-text) transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              aria-label="Send Email"
              className="hover:text-(--color-text) transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-(--color-surface-2) hover:text-(--color-text) transition-colors cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
