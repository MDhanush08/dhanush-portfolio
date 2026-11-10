import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { Container } from '../components/layout/Container'
import { ProjectVisual } from '../components/ui/ProjectVisual'
import { projects, profile } from '../data/portfolio'
import NotFound from './NotFound'

const TYPE_LABELS: Record<string, string> = {
  company: 'Company project',
  freelance: 'Freelance project',
  personal: 'Personal project',
  college: 'College project',
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[currentIndex]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (project) {
      document.title = `${project.title} | ${profile.name}`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', project.shortDescription)
      }
    }
  }, [project, slug])

  if (!project) {
    return <NotFound />
  }

  // Loop through projects for Prev/Next
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main id="main-content" className="w-full min-h-screen bg-[var(--bg)] py-12 md:py-20 text-[var(--ink)]">
      <Container className="max-w-[1240px]">
        {/* Top Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>All projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-12 text-left">
          {/* Label row with Category */}
          <div className="text-xs font-mono uppercase tracking-[0.08em] text-[var(--muted)]">
            <span>{project.category}</span>
          </div>

          {/* Large H1 Title */}
          <h1 className="text-[clamp(2.25rem,6.5vw,5.5rem)] font-semibold tracking-[-0.03em] leading-[1.02] text-[var(--ink)] [text-wrap:balance]">
            {project.title}
          </h1>

          {/* Status Badge */}
          <div className="pt-1">
            <span className="inline-flex items-center px-3 py-1 rounded-[2px] text-xs font-medium border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
              {project.badge}
            </span>
          </div>

          {/* Short description in larger muted size */}
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-[56ch] pt-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Meta Grid (4 cols from 900px, 2 below, hairline separated) */}
        <div className="grid grid-cols-2 min-[900px]:grid-cols-4 border-t border-b border-[var(--line)] py-6 mb-12 gap-6 text-left">
          {/* Role */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--muted)]">
              Role
            </span>
            <span className="text-sm md:text-base font-semibold text-[var(--ink)]">
              {project.role}
            </span>
          </div>

          {/* Project Type */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--muted)]">
              Project Type
            </span>
            <span className="text-sm md:text-base font-semibold text-[var(--ink)]">
              {TYPE_LABELS[project.type] || project.type}
            </span>
          </div>

          {/* Source Link */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--muted)]">
              Source
            </span>
            {project.links?.github && project.links.github !== '[url]' ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:underline"
              >
                <FaGithub className="w-4 h-4 text-[var(--ink)]" />
                <span>GitHub repo</span>
              </a>
            ) : project.links?.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--ink)] hover:underline"
              >
                <ExternalLink className="w-4 h-4 text-[var(--ink)]" />
                <span>Live demo</span>
              </a>
            ) : (
              <span className="text-xs md:text-sm text-[var(--muted)]">
                Private, source not public
              </span>
            )}
          </div>

          {/* Primary Stack */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[var(--muted)]">
              Primary Stack
            </span>
            <span className="text-sm md:text-base font-semibold text-[var(--ink)]">
              {project.cardChips.join(', ')}
            </span>
          </div>
        </div>

        {/* Main Project Preview: 16:9 aspect ratio with clean frame */}
        <div className="relative w-full aspect-[16/9] border border-[var(--line)] bg-[var(--bg-alt)] overflow-hidden rounded-[2px] mb-3 shadow-sm p-0">
          <ProjectVisual
            type={project.visual}
            screenshot={project.screenshots?.[0]}
            alt={project.screenshotAlt || `${project.title} main screenshot`}
            title={project.title}
            priority={true}
          />
        </div>

        {/* Caption shown only when the illustration is used (no screenshots) */}
        {(!project.screenshots || project.screenshots.length === 0) ? (
          <p className="text-xs md:text-sm text-[var(--muted)] text-left mb-12">
            Illustration of the app concept. Screenshots are private.
          </p>
        ) : (
          <div className="mb-9" />
        )}

        {/* Supporting Screenshots Gallery (Rendered only if additional screenshots are available) */}
        {project.screenshots && project.screenshots.length > 1 && (
          <div className="mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-4 text-left">
              Supporting Views
            </div>
            <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-6">
              {project.screenshots.slice(1).map((shot, sIdx) => (
                <div
                  key={sIdx}
                  className="aspect-[16/9] border border-[var(--line)] bg-[var(--bg-alt)] rounded-[2px] overflow-hidden shadow-sm p-0"
                >
                  <img
                    src={shot}
                    alt={`${project.title} supporting screenshot ${sIdx + 1}`}
                    width={1600}
                    height={900}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Sections (Two-column row: label left, content right, separated by hairlines) */}
        <div className="flex flex-col border-t border-[var(--line)] mb-16 text-left">
          {/* 1. Overview */}
          <div className="py-10 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pt-1">
              Overview
            </span>
            <div className="text-base md:text-lg text-[var(--ink)] leading-relaxed max-w-[62ch]">
              <p>{project.overview}</p>
            </div>
          </div>

          {/* 2. Key Features (Grouped into logical categories) */}
          <div className="py-10 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pt-1">
              Key Features
            </span>
            {project.featureGroups && project.featureGroups.length > 0 ? (
              <div className="flex flex-col gap-8 w-full">
                {project.featureGroups.map((group, gIdx) => (
                  <div key={gIdx} className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pb-1.5 border-b border-[var(--line)]/60">
                      {group.category}
                    </span>
                    <div className="flex flex-col">
                      {group.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="py-3 border-b border-[var(--line)] flex items-start gap-4"
                        >
                          <span className="text-xs font-mono text-[var(--muted)] pt-0.5 select-none shrink-0">
                            0{iIdx + 1}
                          </span>
                          <span className="text-base font-medium text-[var(--ink)] leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col border-t border-[var(--line)] w-full">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="py-4 border-b border-[var(--line)] flex items-start gap-4"
                  >
                    <span className="text-xs font-mono text-[var(--muted)] pt-0.5 select-none shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-base font-medium text-[var(--ink)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. My Contributions (Verified implementation details for technical recruiters) */}
          <div className="py-10 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pt-1">
              My Contributions
            </span>
            <div className="flex flex-col border-t border-[var(--line)] w-full">
              {project.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="py-3.5 border-b border-[var(--line)] flex items-start gap-4"
                >
                  <span className="text-xs font-mono text-[var(--muted)] pt-0.5 select-none shrink-0">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-base font-medium text-[var(--ink)] leading-relaxed">
                    {resp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tech Stack (Grouped by Category) */}
          <div className="py-10 border-b border-[var(--line)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pt-1">
              Tech Stack
            </span>
            <div className="flex flex-col gap-6 w-full">
              {Object.entries(project.techGroups).map(([groupTitle, techs]) => (
                <div key={groupTitle} className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                    {groupTitle}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-normal border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[2px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-b border-[var(--line)] py-10 mb-16 text-left">
          {/* Previous Project */}
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col justify-between gap-3 p-5 sm:p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] transition-all duration-200 hover:border-[var(--ink)] hover:bg-[var(--bg-alt)]/40 min-h-[110px]"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] uppercase">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Previous project</span>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--ink)] tracking-tight group-hover:underline">
              {prevProject.title}
            </h4>
          </Link>

          {/* Next Project */}
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col justify-between gap-3 p-5 sm:p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] sm:text-right transition-all duration-200 hover:border-[var(--ink)] hover:bg-[var(--bg-alt)]/40 min-h-[110px]"
          >
            <div className="flex items-center sm:justify-end gap-2 text-xs font-mono text-[var(--muted)] uppercase">
              <span>Next project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--ink)] tracking-tight group-hover:underline">
              {nextProject.title}
            </h4>
          </Link>
        </div>

        {/* CTA Band: "Interested in working together?" */}
        <div className="p-8 md:p-12 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl md:text-3xl font-semibold text-[var(--ink)] tracking-tight">
              Interested in working together?
            </h3>
            <p className="text-sm md:text-base text-[var(--muted)]">
              Let's build reliable software with clarity and precision.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/#contact')}
            className="inline-flex items-center gap-2 h-12 px-6 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] font-semibold text-sm hover:bg-[#A8E600] hover:text-[#14110D] transition-colors shrink-0 cursor-pointer"
          >
            <span>Start a conversation</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </main>
  )
}
