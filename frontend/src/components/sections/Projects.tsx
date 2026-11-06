import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import { ArrowRight } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <Section id="projects">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="04"
        kicker="Projects"
        title="Selected projects"
        description="A curation of multi-role SaaS applications, billing software, and intelligent computer vision platforms."
      />

      {/* Equal 4-Card Grid: 2 columns from 700px up, 1 column below 700px */}
      <Reveal className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-[clamp(16px,2vw,28px)] w-full">
        {portfolioData.projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className="group flex flex-col h-full rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary)/70 transition-all duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) overflow-hidden shadow-xs hover:shadow-lg"
          >
            {/* Visual Panel on Top (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-surface-2)">
              {project.screenshots && project.screenshots.length > 0 ? (
                <img
                  src={project.screenshots[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <ProjectPlaceholder
                  type={project.placeholderType}
                  title={project.title}
                  isPrivate={project.isPrivate}
                />
              )}
            </div>

            {/* Card Content (equal height, balanced padding) */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                {/* Index + Status Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-(--color-primary)">
                    {project.index}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono border bg-(--color-surface-2) border-(--color-border) text-(--color-muted)">
                    {project.statusBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-semibold text-lg sm:text-xl text-(--color-text) group-hover:text-(--color-primary) transition-colors">
                  {project.title}
                </h3>

                {/* Short Description (2 Lines Clamp) */}
                <p className="text-xs sm:text-sm text-(--color-muted) line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Bottom Row: Tech Chips (at most 4 + '+N') & View Details Arrow */}
              <div className="space-y-3.5 pt-3 border-t border-(--color-border)/70">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-[11px] font-sans font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-(--color-surface-2) text-(--color-primary) border border-(--color-border) text-[11px] font-mono font-medium">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-(--color-primary) group-hover:translate-x-1 transition-transform">
                  <span>View details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
};
