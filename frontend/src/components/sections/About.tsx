import React from 'react';
import { Section } from '../layout/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { portfolioData } from '../../data/portfolio';
import {
  Code2,
  Cpu,
  GraduationCap,
  MapPin,
  Sparkles,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <SectionHeading
        kicker="About Me"
        title="Engineering Scalable Solutions with"
        titleHighlight="Precision & Speed"
        description="A passion for high-performance frontend interfaces, resilient backend architectures, and modern AI acceleration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary Narrative */}
        <Reveal className="lg:col-span-6 flex flex-col gap-6">
          <Card className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-(--color-border)">
              <div className="w-10 h-10 rounded-[10px] bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-(--color-text)">
                  Professional Background
                </h3>
                <p className="text-xs text-(--color-muted)">
                  Full-stack engineering &amp; product delivery
                </p>
              </div>
            </div>

            <p className="text-base text-(--color-text) leading-relaxed">
              {portfolioData.summary}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                <Chip icon={<Layers className="w-3.5 h-3.5" />}>Full-Stack Architecture</Chip>
                <Chip icon={<ShieldCheck className="w-3.5 h-3.5" />}>JWT &amp; RBAC Security</Chip>
                <Chip icon={<Cpu className="w-3.5 h-3.5" />}>Hasura &amp; NestJS Services</Chip>
                <Chip icon={<Sparkles className="w-3.5 h-3.5" />}>AI-Driven Productivity</Chip>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Right Side: Bento Grid + AI Highlight Card */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Bento-style Grid (3 items) */}
          <Reveal stagger={0.08} selector=".bento-item">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fact 1: Experience */}
              <Card hoverEffect className="bento-item sm:col-span-1">
                <div className="w-8 h-8 rounded-[8px] bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-2xl font-heading font-bold text-(--color-text) mb-1">
                  2+ Years
                </div>
                <div className="text-xs font-medium text-(--color-muted) mb-2">
                  Software Engineering
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  Building SaaS products, billing systems, and GraphQL APIs.
                </p>
              </Card>

              {/* Fact 2: Education */}
              <Card hoverEffect className="bento-item sm:col-span-1">
                <div className="w-8 h-8 rounded-[8px] bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-2xl font-heading font-bold text-(--color-text) mb-1">
                  B.Tech IT
                </div>
                <div className="text-xs font-medium text-(--color-muted) mb-2">
                  Kongunadu College of Engg
                </div>
                <p className="text-xs text-(--color-muted) leading-relaxed">
                  Information Technology (2020 - 2024), CCNA Certified.
                </p>
              </Card>

              {/* Fact 3: Location */}
              <Card hoverEffect className="bento-item sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-(--color-text)">
                      {portfolioData.location}
                    </div>
                    <p className="text-xs text-(--color-muted)">
                      Available for on-site, hybrid, and remote engineering opportunities.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* AI-Assisted Developer Highlight Card */}
          <Reveal delay={0.1}>
            <Card
              hoverEffect
              className="relative overflow-hidden border-(--color-primary)/40 bg-gradient-to-br from-(--color-surface) via-(--color-surface) to-(--color-surface-2)"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="p-1.5 rounded-[8px] bg-(--color-primary)/10 text-(--color-primary)">
                  <Sparkles className="w-4 h-4 text-(--color-primary)" />
                </span>
                <h4 className="font-heading font-bold text-base text-(--color-text)">
                  {portfolioData.aiAssistedNote.title}
                </h4>
              </div>

              <p className="text-sm text-(--color-muted) leading-relaxed mb-4">
                {portfolioData.aiAssistedNote.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {portfolioData.aiAssistedNote.tools.map((tool, idx) => (
                  <Chip key={idx} variant="primary" size="sm">
                    {tool}
                  </Chip>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
