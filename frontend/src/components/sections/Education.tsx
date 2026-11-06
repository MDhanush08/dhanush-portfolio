import { Award, BookOpen, Globe2, GraduationCap, Languages } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  const { education, certifications, languages } = portfolioData;

  return (
    <Section id="education">
      <SectionHeading
        badge="ACADEMICS & CREDENTIALS"
        title="Education, Certifications &"
        highlight="Languages"
        description="Formal academic foundation in Information Technology paired with recognized technical certifications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Education (Span 1 or 2) */}
        <Reveal delay={0.05} className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-between p-6 sm:p-7 bg-[var(--color-surface)] border-[var(--color-border)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  Degree
                </span>
                <span className="text-xs font-mono text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-secondary)]/20">
                  {education[0]?.period}
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-[var(--color-text)] mb-2">
                {education[0]?.degree}
              </h3>

              <p className="text-sm font-medium text-[var(--color-muted)] mb-3">
                {education[0]?.institution}
              </p>

              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                {education[0]?.notes}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>{education[0]?.location}</span>
            </div>
          </Card>
        </Reveal>

        {/* Certifications (Span 1) */}
        <Reveal delay={0.15} className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-between p-6 sm:p-7 bg-[var(--color-surface)] border-[var(--color-border)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Certifications
                </span>
                <span className="text-xs font-mono text-[var(--color-muted)]">Verified</span>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors"
                  >
                    <p className="text-sm font-bold font-heading text-[var(--color-text)] mb-1">
                      {cert.title}
                    </p>
                    <p className="text-xs font-mono text-[var(--color-secondary)]">
                      Issuer: {cert.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
              <span>Continuously upskilling in distributed systems</span>
            </div>
          </Card>
        </Reveal>

        {/* Languages (Span 1) */}
        <Reveal delay={0.25} className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-between p-6 sm:p-7 bg-[var(--color-surface)] border-[var(--color-border)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Languages className="w-4 h-4" />
                  Communication
                </span>
                <Globe2 className="w-4 h-4 text-[var(--color-secondary)]" />
              </div>

              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold font-heading text-[var(--color-text)]">
                        {lang.name}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-xs font-mono text-[var(--color-muted)]">
                      {lang.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
              <span>Seamless collaboration with global teams</span>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
