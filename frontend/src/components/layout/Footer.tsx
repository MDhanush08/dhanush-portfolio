import { ArrowUp, Mail } from 'lucide-react';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import { Container } from './Container';

const currentYear = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 transition-colors">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-bold text-lg gradient-text">DM</span>
              <span className="text-sm font-heading font-semibold text-[var(--color-text)]">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] max-w-sm">
              Full Stack Software Developer specializing in Angular, React, and NestJS. Engineered with clean code, accessibility, and high performance.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 border border-[var(--color-border)] transition-colors"
            >
              <TbBrandGithub className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]/40 border border-[var(--color-border)] transition-colors"
            >
              <TbBrandLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 border border-[var(--color-border)] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all group text-xs font-mono"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-muted)] font-mono gap-3">
          <p>© {currentYear} Dhanush M. All rights reserved.</p>
          <p>
            Deployed on Netlify • Backend prepared for NestJS
          </p>
        </div>
      </Container>
    </footer>
  );
}
