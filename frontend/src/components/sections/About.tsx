import {
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  GraduationCap,
  MapPin,
  Sparkles,
  Zap,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  const { personal, quickFacts } = portfolioData;

  return (
    <Section id="about">
      <SectionHeading
        badge="BACKGROUND & PHILOSOPHY"
        title="Engineering Solutions with"
        highlight="Precision & Scale"
        description="A full-stack software developer bridging robust backend distributed architectures with sleek, accessible frontend user experiences."
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Summary Card (Span 7) */}
        <div className="md:col-span-7 flex flex-col">
          <Reveal className="h-full">
            <Card className="h-full flex flex-col justify-between p-8 bg-[var(--color-surface)] border-[var(--color-border)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-primary)]">
                  <Cpu className="w-4 h-4" />
                  <span>CORE PROFILE</span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-[var(--color-text)] mb-4">
                  Full Stack Engineer with 2+ Years of Production Impact
                </h3>

                <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-base">
                  {personal.summary}
                </p>

                <p className="text-[var(--color-muted)] leading-relaxed text-sm">
                  Whether architecting multi-tenant role hierarchies with strict JWT authorization,
                  wiring real-time subscriptions over GraphQL, or orchestrating background queues with
                  Redis and Docker, I prioritize clean architectural patterns and reliable performance.
                </p>
              </div>

              {/* Key competencies tags */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-2">
                <Chip label="Full Stack Architecture" variant="primary" size="sm" />
                <Chip label="GraphQL & REST" variant="default" size="sm" />
                <Chip label="JWT & Granular RBAC" variant="default" size="sm" />
                <Chip label="Stripe & Firebase" variant="default" size="sm" />
                <Chip label="Docker & CI/CD" variant="default" size="sm" />
              </div>
            </Card>
          </Reveal>
        </div>

        {/* AI-Assisted Developer Highlight (Span 5) */}
        <div className="md:col-span-5 flex flex-col">
          <Reveal delay={0.1} className="h-full">
            <Card className="h-full flex flex-col justify-between p-8 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] border-[var(--color-primary)]/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-secondary)]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 text-xs font-mono font-medium text-[var(--color-primary)] mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                  <span>NEXT-GEN VELOCITY</span>
                </div>

                <h3 className="text-xl font-bold font-heading text-[var(--color-text)] mb-3">
                  {personal.aiHighlights.title}
                </h3>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                  {personal.aiHighlights.description}
                </p>

                {/* AI Tools Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Claude Code & OpenAI Codex integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Antigravity automated workflows</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gemini API & RAG implementations</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[var(--color-secondary)]" />
                  LLMs & RAG
                </span>
                <span className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                  AI Native
                </span>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Fact Card 1: Experience & Stack (Span 4) */}
        <div className="md:col-span-4">
          <Reveal delay={0.15}>
            <Card className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                  Experience
                </span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-3xl font-extrabold font-heading text-[var(--color-text)] mb-1">
                  {quickFacts[0]?.value}
                </p>
                <p className="text-xs font-mono text-[var(--color-primary)] mb-2 font-medium">
                  {quickFacts[1]?.value}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  Angular, React.js, NestJS microservices, and GraphQL APIs built in production.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Fact Card 2: Education (Span 4) */}
        <div className="md:col-span-4">
          <Reveal delay={0.2}>
            <Card className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                  Academics
                </span>
                <GraduationCap className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-[var(--color-text)] mb-1">
                  {quickFacts[2]?.value}
                </p>
                <p className="text-xs font-mono text-[var(--color-secondary)] mb-2 font-medium">
                  Information Technology (2020 – 2024)
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  Kongunadu College of Engineering and Technology, Tamil Nadu.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Fact Card 3: Location & Availability (Span 4) */}
        <div className="md:col-span-4">
          <Reveal delay={0.25}>
            <Card className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
                  Location & Setup
                </span>
                <MapPin className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <p className="text-lg font-bold font-heading text-[var(--color-text)] mb-1">
                  Tiruchirappalli, TN, India
                </p>
                <p className="text-xs font-mono text-emerald-400 mb-2 font-medium">
                  Open to Remote & Hybrid Roles
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  Collaborating across global timezones with reliable modern tooling.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
