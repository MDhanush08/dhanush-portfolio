import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import { GraduationCap, Award, Languages, Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <Section id="education">
      <SectionHeading
        kicker="Credentials"
        title="Education &amp;"
        titleHighlight="Certifications"
        description="Formal engineering foundation, professional network certifications, and languages."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Education Column */}
        <Reveal className="lg:col-span-5">
          <Card hoverEffect className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-(--color-border)">
                <div className="w-10 h-10 rounded-[10px] bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-(--color-text)">
                    Higher Education
                  </h3>
                  <p className="text-xs text-(--color-muted)">
                    Academic engineering degree
                  </p>
                </div>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-lg font-heading font-bold text-(--color-text)">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-semibold text-(--color-primary)">
                    {edu.field}
                  </div>
                  <div className="text-sm text-(--color-text)">
                    {edu.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-(--color-muted) pt-2">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Certifications & Languages Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Certifications */}
          <Reveal stagger={0.08} selector=".cert-item">
            <Card className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-(--color-border)">
                <div className="w-10 h-10 rounded-[10px] bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-(--color-text)">
                    Industry Certifications
                  </h3>
                  <p className="text-xs text-(--color-muted)">
                    Validated technical proficiencies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="cert-item p-4 rounded-[12px] bg-(--color-surface-2) border border-(--color-border) flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-(--color-text) mb-1">
                        {cert.name}
                      </div>
                      <div className="text-xs font-semibold text-(--color-primary) mb-2">
                        {cert.issuer}
                      </div>
                      {cert.details && (
                        <p className="text-xs text-(--color-muted) leading-relaxed">
                          {cert.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          {/* Languages Card */}
          <Reveal delay={0.1}>
            <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-(--color-text)">
                    Languages
                  </h4>
                  <p className="text-xs text-(--color-muted)">
                    Communication in international &amp; local teams
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {portfolioData.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-[8px] bg-(--color-surface-2) border border-(--color-border) text-xs"
                  >
                    <span className="font-medium text-(--color-text)">{lang.language}</span>{' '}
                    <span className="text-(--color-muted)">({lang.proficiency.split(' ')[0]})</span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
