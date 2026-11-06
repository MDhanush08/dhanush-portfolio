import React from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import {
  Sparkles,
  Layers,
  MapPin,
  FolderGit2,
  ShieldCheck,
  Cpu,
  GraduationCap,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section id="about">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="01"
        kicker="About Me"
        title="Building reliable web apps, end to end"
        description="Focused on high performance, secure architectures, and developer velocity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Fully Visible Narrative Paragraph */}
        <Reveal className="lg:col-span-6 flex flex-col gap-6">
          <Card className="p-6 sm:p-8 lg:p-9 rounded-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-(--color-primary) font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
              <span>Full-Stack Perspective</span>
            </div>

            <p className="text-base sm:text-lg text-(--color-text) leading-relaxed">
              {portfolioData.summary}
            </p>

            <p className="text-sm sm:text-base text-(--color-muted) leading-relaxed">
              Every system I build is optimized for sub-second responses, role-based access security, and reliable cloud deployments.
            </p>

            {/* Core Competencies Chips */}
            <div className="pt-4 border-t border-(--color-border) flex flex-wrap gap-2">
              <Chip icon={<Layers className="w-3.5 h-3.5" />}>Full-Stack Architecture</Chip>
              <Chip icon={<ShieldCheck className="w-3.5 h-3.5" />}>JWT &amp; RBAC Security</Chip>
              <Chip icon={<Cpu className="w-3.5 h-3.5" />}>NestJS &amp; GraphQL</Chip>
              <Chip icon={<Sparkles className="w-3.5 h-3.5" />}>AI-Assisted Workflow</Chip>
            </div>
          </Card>
        </Reveal>

        {/* Right Column: Static Facts Cards */}
        <Reveal delayMs={100} className="lg:col-span-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fact 1: 2+ Years Experience */}
            <Card hoverEffect className="p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl font-sans font-semibold text-(--color-text) mb-1">
                  2+ years experience
                </div>
                <div className="text-xs font-mono text-(--color-primary) font-medium mb-1">
                  Software Developer
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  Building multi-role SaaS products, billing engines, and NestJS services.
                </p>
              </div>
            </Card>

            {/* Fact 2: Full Stack Focus */}
            <Card hoverEffect className="p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center mb-3">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl font-sans font-semibold text-(--color-text) mb-1">
                  Full Stack
                </div>
                <div className="text-xs font-mono text-(--color-secondary) font-medium mb-1">
                  Angular, React, NestJS
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  PostgreSQL, Redis queues, Hasura GraphQL, and Docker deployments.
                </p>
              </div>
            </Card>

            {/* Fact 3: Education */}
            <Card hoverEffect className="p-5 sm:p-6 rounded-2xl sm:col-span-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-sans font-semibold text-(--color-text)">
                    B.Tech Information Technology
                  </div>
                  <div className="text-xs font-mono text-(--color-muted) mb-1">
                    Kongunadu College of Engineering and Technology (2020 - 2024)
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-(--color-muted)">
                    <MapPin className="w-3.5 h-3.5 text-(--color-primary)" />
                    <span>Trichy / Namakkal, Tamil Nadu</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
