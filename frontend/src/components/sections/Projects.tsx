import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder';
import { portfolioData } from '../../data/portfolio';
import { ExternalLink, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stackCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop Only (>= 1024px): Sticky Card Stacking and Parallax
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!stackCardsRef.current) return;

        const cards = stackCardsRef.current.querySelectorAll<HTMLElement>('.project-stack-card');

        cards.forEach((card, i) => {
          // If not the last card, animate scale and dim as subsequent cards stack on top
          if (i < cards.length - 1) {
            const nextCard = cards[i + 1];

            gsap.to(card, {
              scale: 0.94,
              opacity: 0.6,
              transformOrigin: 'top center',
              ease: 'none',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 85%',
                end: 'top 20%',
                scrub: 0.3,
              },
            });
          }

          // Subtle inner parallax on the card's visual panel
          const visual = card.querySelector('.project-visual-panel');
          if (visual) {
            gsap.fromTo(
              visual,
              { y: 12 },
              {
                y: -12,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.4,
                },
              }
            );
          }
        });
      });

      // Mobile / Reduced Motion: Reset all transforms
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        if (!stackCardsRef.current) return;
        const cards = stackCardsRef.current.querySelectorAll<HTMLElement>('.project-stack-card');
        cards.forEach((c) => {
          c.style.transform = 'none';
          c.style.opacity = '1';
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <Section ref={containerRef} id="projects">
      <SplitHeading
        number="04"
        kicker="Featured Projects"
        title="Production Systems &amp;"
        accent="Architectural"
        titleEnd="Showcase"
        description="A curation of multi-role SaaS applications, billing software, and intelligent computer vision platforms."
      />

      {/* Desktop Sticky Stacking Cards Container */}
      <div ref={stackCardsRef} className="space-y-8 lg:space-y-12 relative">
        {portfolioData.projects.map((project, idx) => {
          const indexFormatted = String(idx + 1).padStart(2, '0');
          const isFeatured = project.isFeatured;

          // Compute increasing top offset for desktop sticky cards
          const stickyTopOffset = 88 + idx * 24;

          return (
            <div
              key={project.id}
              className="project-stack-card lg:sticky transition-all duration-300"
              style={{
                top: `${stickyTopOffset}px`,
              }}
            >
              <Card
                className={`group relative overflow-hidden p-6 sm:p-8 lg:p-10 rounded-3xl border transition-all duration-300 ${
                  isFeatured
                    ? 'border-(--color-primary)/60 bg-gradient-to-br from-(--color-surface) via-(--color-surface) to-(--color-surface-2) shadow-2xl'
                    : 'border-(--color-border) bg-(--color-surface) shadow-xl'
                } hover:border-(--color-primary)/70`}
              >
                {/* Background Subtle Accent Glow */}
                <div
                  className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full opacity-15 -z-10"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'radial-gradient(circle, var(--primary) 0%, transparent 70%)'
                        : 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Column: Index & Project Details */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Index + Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-(--color-border)">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-(--color-primary)">
                          {indexFormatted}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                          {project.category}
                        </span>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--color-primary)/15 text-(--color-primary) text-xs font-mono font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            Flagship Enterprise
                          </span>
                        )}
                      </div>

                      {project.isPrivate ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
                          <Lock className="w-3 h-3" />
                          <span>{project.privateBadgeText || 'Private / Client Project'}</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                          Open Source
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-(--color-text) tracking-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-(--color-secondary) font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-(--color-muted) leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architectural Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="pt-1">
                        <ul className="space-y-2">
                          {project.highlights.slice(0, 3).map((hl, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-(--color-text)"
                            >
                              <CheckCircle2 className="w-4 h-4 text-(--color-secondary) shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Chips */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, tIdx) => (
                          <Chip key={tIdx} size="sm" variant="default">
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Role & Links Footer */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-(--color-border)">
                      <div className="text-xs font-mono text-(--color-muted)">
                        Role: <span className="text-(--color-text) font-medium">{project.role}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            size="sm"
                            icon={<FaGithub className="w-3.5 h-3.5" />}
                          >
                            Repository
                          </Button>
                        )}

                        {project.liveUrl && project.liveUrl !== '#' && (
                          <Button
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="sm"
                            icon={<ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                            iconPosition="right"
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Panel with Parallax */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="project-visual-panel w-full transition-transform duration-300">
                      <ProjectPlaceholder
                        type={project.placeholderType}
                        title={project.title}
                        isPrivate={project.isPrivate}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
