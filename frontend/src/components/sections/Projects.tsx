import { useState } from 'react';
import { ExternalLink, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { TbBrandGithub } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import type { Project, ProjectCategory } from '../../types';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const categories: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend & AI', value: 'backend-ai' },
];

function ProjectGraphic({ project }: { project: Project }) {
  if (project.id === 'dental-interface-360') {
    return (
      <div className="w-full h-48 sm:h-56 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-[var(--color-border)] p-4 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Dental Interface 360 SaaS
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-[10px]">
            4 User Tiers
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto">
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-center">
            <p className="text-[10px] font-mono text-slate-400">Auth</p>
            <p className="text-xs font-bold text-slate-200">JWT & RBAC</p>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-900/40 border border-indigo-700/60 text-center">
            <p className="text-[10px] font-mono text-indigo-300">Billing</p>
            <p className="text-xs font-bold text-indigo-100">Stripe</p>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-900/40 border border-cyan-700/60 text-center">
            <p className="text-[10px] font-mono text-cyan-300">Queue</p>
            <p className="text-xs font-bold text-cyan-100">Redis</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Contabo VPS • GitLab CI/CD</span>
          <span className="text-cyan-300">GraphQL / Hasura</span>
        </div>
      </div>
    );
  }

  if (project.id === 'lala-invoice') {
    return (
      <div className="w-full h-48 sm:h-56 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 border border-[var(--color-border)] p-4 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
          <span>Lala Invoice & Billing</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-[10px]">
            Admin / User RBAC
          </span>
        </div>

        <div className="my-auto space-y-2">
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">INV-2025-084</span>
            <span className="text-emerald-400 font-bold">Paid • Verified</span>
          </div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Redux Global Store</span>
            <span className="text-slate-400">MongoDB Persistence</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Dynamic Calculations</span>
          <span className="text-emerald-300">PDF Generation</span>
        </div>
      </div>
    );
  }

  if (project.id === 'personal-portfolio') {
    return (
      <div className="w-full h-48 sm:h-56 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-[var(--color-border)] p-4 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
          <span>Developer Portfolio</span>
          <span className="px-2 py-0.5 rounded bg-indigo-900/60 border border-indigo-700 text-[10px]">
            React 19 + GSAP
          </span>
        </div>

        <div className="my-auto text-center space-y-1">
          <p className="text-lg font-bold font-mono gradient-text">Dhanush M</p>
          <p className="text-xs font-mono text-slate-400">
            Zero-FOUC Dual Themes • Accessible AI Chatbot
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Tailwind v4 @theme</span>
          <span className="text-indigo-300">ScrollTrigger 60fps</span>
        </div>
      </div>
    );
  }

  // Face emotion detection
  return (
    <div className="w-full h-48 sm:h-56 rounded-xl bg-gradient-to-br from-slate-900 to-rose-950 border border-[var(--color-border)] p-4 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between text-xs font-mono text-rose-300">
        <span>Vision + Microcontroller</span>
        <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-[10px]">
          Hardware IoT
        </span>
      </div>

      <div className="my-auto space-y-2">
        <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Facial Landmarks</span>
          <span className="text-rose-400 font-bold">Python OpenCV</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Serial I/O Bus</span>
          <span className="text-amber-400 font-bold">Arduino Actuators</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
        <span>Real-time Classification</span>
        <span className="text-rose-300">Physical Actuation</span>
      </div>
    </div>
  );
}

export function Projects() {
  const { projects } = portfolioData;
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  return (
    <Section id="projects">
      <SectionHeading
        badge="FEATURED WORK"
        title="Engineered for Performance &"
        highlight="Real-World Impact"
        description="A curation of enterprise multi-tenant SaaS architectures, business billing applications, and interactive digital experiences."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-primary)]/20'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/40'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.1}>
            <Card className="h-full flex flex-col justify-between p-6 sm:p-8 bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 group transition-all duration-300">
              <div>
                {/* Visual / Screenshot Area */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <ProjectGraphic project={project} />
                </div>

                {/* Role and Private badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[var(--color-primary)] font-medium">
                    {project.role}
                  </span>

                  {project.isPrivate ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-mono">
                      <Lock className="w-3 h-3" />
                      <span>{project.links.label || 'Private Project'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-mono">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Open Repository</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold font-heading text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[var(--color-secondary)] mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tags.map((tag) => (
                    <Chip key={tag} label={tag} variant="default" size="sm" />
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.links.github && (
                    <Button
                      href={project.links.github}
                      target="_blank"
                      variant="outline"
                      size="sm"
                      icon={<TbBrandGithub className="w-3.5 h-3.5" />}
                    >
                      Source Code
                    </Button>
                  )}

                  {project.links.live && project.links.live !== '#' && (
                    <Button
                      href={project.links.live}
                      target="_blank"
                      variant="primary"
                      size="sm"
                      iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Live Demo
                    </Button>
                  )}

                  {project.isPrivate && (
                    <span className="text-xs font-mono text-[var(--color-muted)] italic">
                      Internal architecture details available upon request
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
