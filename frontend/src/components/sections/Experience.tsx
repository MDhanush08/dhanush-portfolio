import React from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2, FolderGit2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <Section id="experience">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="03"
        kicker="Experience"
        title="My career journey"
        description="Delivering multi-role enterprise SaaS platforms, resilient APIs, and client systems."
      />

      <div className="relative w-full">
        {/* Static Background Guide Line */}
        <div
          className="absolute left-4 sm:left-6 top-3 bottom-6 w-0.5 bg-gradient-to-b from-(--color-primary) via-(--color-primary)/30 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-10 sm:space-y-12">
          {portfolioData.experience.map((exp, idx) => (
            <Reveal key={exp.id} delayMs={idx * 80} className="relative pl-11 sm:pl-16">
              {/* Timeline Node / Dot */}
              <div
                className="absolute left-2 sm:left-4 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-(--color-surface) border-2 border-(--color-primary) flex items-center justify-center shadow-md z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
              </div>

              <Card hoverEffect className="space-y-5 p-6 sm:p-7 rounded-2xl">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-(--color-border)">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-(--color-primary)" />
                      <h3 className="font-sans font-semibold text-lg sm:text-xl text-(--color-text)">
                        {exp.role}
                      </h3>
                    </div>
                    <div className="text-sm font-medium text-(--color-primary)">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-(--color-muted)">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                    Key Architectural Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((hl, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-(--color-text)/90 font-normal leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-(--color-primary) shrink-0 mt-1" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-2.5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-[13px] font-sans font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Freelance Project Showcase */}
                {exp.id === 'freelance-developer' &&
                  portfolioData.freelanceProjects.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-(--color-border)">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                        <FolderGit2 className="w-3.5 h-3.5 text-(--color-secondary)" />
                        <span>Delivered Client Deployments</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {portfolioData.freelanceProjects.map((fp, fpIdx) => (
                          <div
                            key={fpIdx}
                            className="p-3.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) flex flex-col justify-between space-y-2"
                          >
                            <div>
                              <div className="font-sans font-semibold text-sm text-(--color-text)">
                                {fp.title}
                              </div>
                              <p className="text-xs text-(--color-muted) mt-1 leading-relaxed">
                                {fp.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {fp.techStack.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-(--color-surface) border border-(--color-border) text-(--color-muted)"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};
