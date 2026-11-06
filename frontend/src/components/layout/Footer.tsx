import React from 'react';
import { Container } from './Container';
import { portfolioData } from '../../data/portfolio';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {

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
    <footer className="w-full border-t border-(--color-border) bg-(--color-surface) py-10 transition-colors duration-200">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-heading font-bold text-base text-(--color-text)">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-(--color-primary) to-(--color-secondary)" />
            {portfolioData.name}
          </div>
          <span className="hidden sm:inline text-(--color-border)">|</span>
          <p className="text-xs sm:text-sm text-(--color-muted)">
            © {CURRENT_YEAR} All rights reserved. Built with React &amp; Tailwind CSS.
          </p>
        </div>

        {/* Socials & Top Link */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2) transition-colors duration-150"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2) transition-colors duration-150"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            aria-label="Send Email"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2) transition-colors duration-150"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-2 text-xs font-mono font-medium rounded-[8px] text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface-2) transition-colors duration-150 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};
