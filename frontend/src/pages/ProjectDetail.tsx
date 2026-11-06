import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { ProjectPlaceholder } from '../components/ui/ProjectPlaceholder';
import { NotFound } from './NotFound';
import { portfolioData, getProjectBySlug } from '../data/portfolio';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Briefcase,
  Layers,
  Sparkles,
  MessageSquareText,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // SEO: Update page title and meta description
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Dhanush M`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.shortDescription);
      }
    }
    return () => {
      document.title = 'Dhanush M | Software Developer (Full Stack)';
    };
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  // Calculate Previous and Next project for cyclical navigation
  const currentIndex = portfolioData.projects.findIndex((p) => p.slug === project.slug);
  const totalProjects = portfolioData.projects.length;
  const prevProject = portfolioData.projects[(currentIndex - 1 + totalProjects) % totalProjects];
  const nextProject = portfolioData.projects[(currentIndex + 1) % totalProjects];

  return (
    <div className="py-10 sm:py-14 lg:py-20">
      <Container className="space-y-12 sm:space-y-16">
        {/* Top Back Navigation Link */}
        <Reveal>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-(--color-muted) hover:text-(--color-primary) transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to projects</span>
          </Link>
        </Reveal>

        {/* Header Block: Mono Index, H1 Title, Status Badge, Short Description */}
        <Reveal delayMs={50} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold text-(--color-primary) tracking-wider uppercase">
              {project.index} / Project
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border bg-(--color-surface-2) border-(--color-border) text-(--color-muted)">
              {project.statusBadge}
            </span>
            <span className="text-xs font-mono text-(--color-muted)/70">
              {project.category}
            </span>
          </div>

          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-(--color-text) tracking-tight">
            {project.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-(--color-muted) max-w-[65ch] leading-relaxed">
            {project.shortDescription}
          </p>
        </Reveal>

        {/* Metadata Row: Role, Project Type, and Action Buttons */}
        <Reveal delayMs={100}>
          <div className="p-5 sm:p-6 rounded-2xl bg-(--color-surface) border border-(--color-border) shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-(--color-primary)" />
                  <span>Role</span>
                </div>
                <div className="font-sans font-semibold text-sm sm:text-base text-(--color-text)">
                  {project.role}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-1">
                  <Layers className="w-3.5 h-3.5 text-(--color-secondary)" />
                  <span>Project Type</span>
                </div>
                <div className="font-sans font-semibold text-sm sm:text-base text-(--color-text)">
                  {project.projectType}
                </div>
              </div>
            </div>

            {/* Links or Private Notice */}
            <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-(--color-border)">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={<FaGithub className="w-4 h-4" />}
                >
                  Source Repository
                </Button>
              )}

              {project.liveUrl && project.liveUrl !== '#' && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Live Deployment
                </Button>
              )}

              {project.isPrivate && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-mono">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Private / Client project, source not public</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Visual Presentation Panel */}
        <Reveal delayMs={120} className="space-y-2">
          <div className="w-full aspect-video max-h-[560px] rounded-2xl overflow-hidden bg-(--color-surface-2) border border-(--color-border) shadow-xl">
            {project.screenshots && project.screenshots.length > 0 ? (
              <img
                src={project.screenshots[0]}
                alt={`${project.title} screenshot preview`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ProjectPlaceholder
                  type={project.placeholderType}
                  title={project.title}
                  isPrivate={project.isPrivate}
                />
              </div>
            )}
          </div>
          <p className="text-xs font-mono text-(--color-muted) text-center pt-1">
            Figure: Architecture &amp; interface preview for {project.title}
          </p>
        </Reveal>

        {/* Overview Section */}
        <Reveal delayMs={140} className="space-y-4 max-w-[65ch]">
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-(--color-text) tracking-tight">
            Project Overview
          </h2>
          <p className="font-sans text-base sm:text-lg text-(--color-text)/90 leading-relaxed">
            {project.overview}
          </p>
        </Reveal>

        {/* Key Features Section */}
        {project.features && project.features.length > 0 && (
          <Reveal delayMs={160} className="space-y-5 max-w-[70ch]">
            <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-(--color-text) tracking-tight">
              Key Features &amp; Architecture
            </h2>
            <ul className="space-y-3.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base text-(--color-text)/90 leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-(--color-primary) shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Responsibilities Section */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <Reveal delayMs={180} className="space-y-5 max-w-[70ch]">
            <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-(--color-text) tracking-tight">
              My Contributions &amp; Implementation
            </h2>
            <ul className="space-y-3.5">
              {project.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base text-(--color-text)/90 leading-relaxed"
                >
                  <Sparkles className="w-5 h-5 text-(--color-secondary) shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Grouped Tech Stack Section */}
        <Reveal delayMs={200} className="space-y-6">
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-(--color-text) tracking-tight">
            Technologies &amp; Architecture Stack
          </h2>

          {project.groupedTechStack && project.groupedTechStack.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.groupedTechStack.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="p-5 rounded-2xl bg-(--color-surface) border border-(--color-border) shadow-xs space-y-3"
                >
                  <h3 className="font-mono text-xs uppercase tracking-wider text-(--color-primary) font-semibold">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-xs font-sans font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-(--color-surface-2) text-(--color-text) border border-(--color-border) text-xs sm:text-sm font-sans font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        {/* Previous / Next Project Navigation & Contact CTA */}
        <Reveal delayMs={220} className="pt-8 border-t border-(--color-border) space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prev Project Card */}
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group p-5 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-(--color-muted) mb-1 group-hover:text-(--color-primary) transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Project ({prevProject.index})</span>
              </div>
              <div className="font-sans font-semibold text-base sm:text-lg text-(--color-text)">
                {prevProject.title}
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group p-5 rounded-2xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) transition-all flex flex-col justify-between text-left sm:text-right"
            >
              <div className="flex items-center sm:justify-end gap-1.5 text-xs font-mono text-(--color-muted) mb-1 group-hover:text-(--color-primary) transition-colors">
                <span>Next Project ({nextProject.index})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-sans font-semibold text-base sm:text-lg text-(--color-text)">
                {nextProject.title}
              </div>
            </Link>
          </div>

          {/* Contact Call to Action */}
          <div className="p-6 sm:p-8 rounded-2xl bg-(--color-surface-2) border border-(--color-border) flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-(--color-text)">
                Interested in working together?
              </h3>
              <p className="text-xs sm:text-sm text-(--color-muted) mt-1">
                Whether you have an engineering role or a scalable project in mind, let's talk.
              </p>
            </div>
            <Button
              href="/#contact"
              variant="primary"
              size="md"
              icon={<MessageSquareText className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  );
};

export default ProjectDetail;
