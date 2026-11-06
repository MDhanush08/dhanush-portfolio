import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { portfolioData } from '../../data/portfolio';
import { GraduationCap, Award, Languages, Calendar, MapPin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!cardsRef.current) return;
        const items = cardsRef.current.querySelectorAll('.edu-card');
        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (cardsRef.current) {
          const items = cardsRef.current.querySelectorAll('.edu-card');
          items.forEach((item) => {
            if (item instanceof HTMLElement) {
              item.style.opacity = '1';
              item.style.transform = 'none';
            }
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <Section ref={containerRef} id="education">
      <SplitHeading
        number="05"
        kicker="Credentials"
        title="Engineering"
        accent="Academics"
        titleEnd="& Certifications"
        description="Formal computer engineering degree, professional networking accreditations, and language proficiencies."
      />

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Education Column */}
        <div className="lg:col-span-5">
          <Card hoverEffect className="edu-card h-full p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-3 mb-5 border-b border-(--color-border)">
                <div className="w-10 h-10 rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-(--color-text)">
                    Undergraduate Degree
                  </h3>
                  <p className="text-xs font-mono text-(--color-muted)">
                    Academic Engineering Foundation
                  </p>
                </div>
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2.5">
                  <div className="text-xl font-display font-bold text-(--color-text)">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-semibold text-(--color-primary)">
                    {edu.field}
                  </div>
                  <div className="text-sm text-(--color-text)/90">
                    {edu.institution}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-(--color-muted) pt-3">
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
        </div>

        {/* Certifications & Languages Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Certifications Card */}
          <Card className="edu-card p-6 sm:p-8 rounded-2xl space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-(--color-border)">
              <div className="w-10 h-10 rounded-xl bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-(--color-text)">
                  Professional Certifications
                </h3>
                <p className="text-xs font-mono text-(--color-muted)">
                  Industry-Recognized Technical Standards
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-(--color-surface-2) border border-(--color-border) flex flex-col justify-between"
                >
                  <div>
                    <div className="font-display font-bold text-sm text-(--color-text) mb-1">
                      {cert.name}
                    </div>
                    <div className="text-xs font-mono font-semibold text-(--color-primary) mb-2">
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
          <Card className="edu-card p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-(--color-text)">
                  Languages
                </h4>
                <p className="text-xs text-(--color-muted)">
                  Effective communication in cross-functional teams
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {portfolioData.languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-(--color-surface-2) border border-(--color-border) text-xs font-mono"
                >
                  <span className="font-semibold text-(--color-text)">{lang.language}</span>{' '}
                  <span className="text-(--color-muted)">({lang.proficiency.split(' ')[0]})</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
