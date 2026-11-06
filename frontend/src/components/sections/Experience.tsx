import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2, FolderGit2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <SectionHeading
        kicker="Career Journey"
        title="Professional"
        titleHighlight="Work Experience"
        description="Demonstrated track record of delivering secure, scalable SaaS applications and microservices."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Static Vertical Timeline Line */}
        <div
          className="absolute left-4 sm:left-6 top-3 bottom-6 w-0.5 bg-(--color-border)"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="relative pl-12 sm:pl-16">
              {/* Static Timeline Node / Dot */}
              <div
                className="absolute left-2 sm:left-4 top-1.5 -translate-x-1/2 w-5 h-5 rounded-full bg-(--color-surface) border-2 border-(--color-primary) flex items-center justify-center shadow-xs"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-(--color-primary)" />
              </div>

              <Reveal>
                <Card hoverEffect className="space-y-5">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-(--color-border)">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-(--color-primary)" />
                        <h3 className="font-heading font-bold text-xl text-(--color-text)">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="text-sm font-semibold text-(--color-primary)">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-(--color-muted)">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                      Key Responsibilities &amp; Achievements
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-sm text-(--color-text) leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-2.5">
                      Technologies &amp; Architecture
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, tIdx) => (
                        <Chip key={tIdx} size="sm" variant="default">
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Render Freelance Client Projects if present on this item */}
                  {exp.id === 'freelance-developer' &&
                    portfolioData.freelanceProjects.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-(--color-border)/80">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                          <FolderGit2 className="w-3.5 h-3.5 text-(--color-secondary)" />
                          <span>Delivered Client Solutions (Editable Portfolio Array)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {portfolioData.freelanceProjects.map((p, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-3.5 rounded-[10px] bg-(--color-surface-2) border border-(--color-border)"
                            >
                              <div className="text-xs font-heading font-bold text-(--color-text) mb-1">
                                {p.title}
                              </div>
                              <p className="text-xs text-(--color-muted) mb-2.5 leading-relaxed">
                                {p.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {p.techStack.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-(--color-surface) text-(--color-text) border border-(--color-border)"
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
