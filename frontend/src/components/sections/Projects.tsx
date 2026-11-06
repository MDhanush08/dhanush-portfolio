import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder';
import { portfolioData } from '../../data/portfolio';
import type { ProjectCategory, ProjectItem } from '../../types/portfolio';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { cn } from '../../lib/utils';

const CATEGORIES: ProjectCategory[] = ['All', 'Full Stack', 'Frontend', 'Backend/AI'];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <Section id="projects">
      <SectionHeading
        kicker="Featured Work"
        title="Production"
        titleHighlight="Projects &amp; Architectures"
        description="A selection of enterprise SaaS platforms, client applications, and AI integrations."
      />

      {/* Lag-free category filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-[10px] text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-primary)',
              selectedCategory === cat
                ? 'bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white font-semibold shadow-sm'
                : 'bg-(--color-surface-2) text-(--color-muted) hover:text-(--color-text) border border-(--color-border)'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {filteredProjects.map((project: ProjectItem) => {
          const isFeatured = project.isFeatured;

          return (
            <Reveal key={project.id}>
              <Card
                hoverEffect
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isFeatured && 'border-(--color-primary)/50 bg-gradient-to-br from-(--color-surface) via-(--color-surface) to-(--color-surface-2)/60'
                )}
              >
                <div
                  className={cn(
                    'grid grid-cols-1 gap-6 sm:gap-8 items-start',
                    isFeatured ? 'lg:grid-cols-12' : 'lg:grid-cols-12'
                  )}
                >
                  {/* Visual Preview Placeholder */}
                  <div className={cn(isFeatured ? 'lg:col-span-5' : 'lg:col-span-4')}>
                    <ProjectPlaceholder
                      type={project.placeholderType}
                      title={project.title}
                      isPrivate={project.isPrivate}
                    />
                  </div>

                  {/* Content Column */}
                  <div className={cn(isFeatured ? 'lg:col-span-7' : 'lg:col-span-8', 'space-y-4')}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-(--color-primary)/15 text-(--color-primary) text-[11px] font-mono font-bold tracking-wider uppercase">
                            <Sparkles className="w-3 h-3" />
                            Featured Flagship
                          </span>
                        )}
                        <span className="text-xs font-mono text-(--color-muted) px-2 py-0.5 rounded bg-(--color-surface-2) border border-(--color-border)">
                          {project.category}
                        </span>
                      </div>

                      {project.isPrivate ? (
                        <span className="text-[11px] font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                          {project.privateBadgeText || 'Private / Client Project'}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          Open Source
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-(--color-text) mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-(--color-primary)">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-(--color-muted) leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Architectural Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="pt-1">
                        <ul className="space-y-1.5">
                          {project.highlights.slice(0, isFeatured ? 4 : 3).map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-(--color-text)">
                              <CheckCircle2 className="w-3.5 h-3.5 text-(--color-secondary) shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, idx) => (
                          <Chip key={idx} size="sm" variant="default">
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Links & Role Row */}
                    <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-(--color-border)/80 text-xs">
                      <div className="font-mono text-(--color-muted)">
                        Role: <span className="text-(--color-text) font-medium">{project.role}</span>
                      </div>

                      <div className="flex items-center gap-2">
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
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                            iconPosition="right"
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};
