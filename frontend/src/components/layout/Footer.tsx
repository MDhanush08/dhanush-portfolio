import React from 'react';
import { Container } from './Container';
import { portfolioData } from '../../data/portfolio';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-(--color-border) bg-(--color-surface) py-10 transition-colors duration-200">
      <Container className="space-y-6">
        {/* Top Row: 3 columns on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Column 1: Brand & Role */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-(--color-primary) to-(--color-secondary) text-white font-sans font-bold text-xs shadow-xs">
              DM
            </div>
            <div>
              <div className="font-sans font-semibold text-sm text-(--color-text)">
                Dhanush M
              </div>
              <div className="text-xs font-mono text-(--color-muted)">
                Software Developer
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono uppercase tracking-wider text-(--color-muted)" aria-label="Footer navigation">
            <a href="#about" className="hover:text-(--color-primary) transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-(--color-primary) transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-(--color-primary) transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-(--color-primary) transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-(--color-primary) transition-colors">
              Contact
            </a>
          </nav>

          {/* Column 3: Social Icon Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              aria-label="Send Email"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-(--color-muted) hover:text-(--color-text) bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Thin Divider & Bottom Metadata */}
        <div className="pt-4 border-t border-(--color-border)/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-(--color-muted)">
          <div>
            © {CURRENT_YEAR} Dhanush M. All rights reserved.
          </div>
          <div>
            Built with React and GSAP.
          </div>
        </div>
      </Container>
    </footer>
  );
};
