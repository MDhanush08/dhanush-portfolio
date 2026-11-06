import React from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import { GraduationCap, Award, Languages, Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <Section id="education">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="05"
        kicker="Credentials"
        title="Education and certifications"
        description="Academic engineering foundation, professional networking accreditations, and language proficiencies."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Education Column */}
        <Reveal className="lg:col-span-5">
          <Card hoverEffect className="h-full p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-(--color-border)">
                <div className="w-9 h-9 rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-(--color-text)">
                    Undergraduate Degree
                  </h3>
                  <p className="text-xs font-mono text-(--color-muted)">
                    Academic Foundation
                  </p>
                </div>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-lg sm:text-xl font-sans font-semibold text-(--color-text)">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-medium text-(--color-primary)">
                    {edu.field}
                  </div>
                  <div className="text-sm text-(--color-text)/90">
                    {edu.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-(--color-muted) pt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border)">
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
        <Reveal delayMs={100} className="lg:col-span-7 flex flex-col gap-5">
          {/* Certifications Card */}
          <Card className="p-6 sm:p-7 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-(--color-border)">
              <div className="w-9 h-9 rounded-xl bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-base sm:text-lg text-(--color-text)">
                  Professional Certifications
                </h3>
                <p className="text-xs font-mono text-(--color-muted)">
                  Industry Standards
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-(--color-surface-2) border border-(--color-border) flex flex-col justify-between"
                >
                  <div>
                    <div className="font-sans font-semibold text-sm text-(--color-text) mb-1">
                      {cert.name}
                    </div>
                    <div className="text-xs font-mono text-(--color-primary) font-medium mb-1.5">
                      Issuer: {cert.issuer}
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

          {/* Languages Card */}
          <Card className="p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-(--color-text)">
                  Languages
                </h4>
                <p className="text-xs text-(--color-muted)">
                  Communication in cross-functional teams
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {portfolioData.languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-(--color-surface-2) border border-(--color-border) text-xs font-sans font-medium"
                >
                  <span className="font-semibold text-(--color-text)">{lang.language}</span>{' '}
                  <span className="text-(--color-muted)">({lang.proficiency.split(' ')[0]})</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
};
