"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { Container } from "@/components/shared/Container";
import { FeaturedProjectsVisual } from "@/components/public/FeaturedProjectsVisual";
import { ProjectCard } from "@/components/public/ProjectCard";
import type { HeroHeadlineLine } from "@/lib/content";
import { useSectionReveal } from "@/lib/hooks/use-section-reveal";
import { localePath, type Locale } from "@/lib/i18n";
import type { ProjectWithDetails } from "@/lib/project-types";

const PROJECTS_ENTER_BASE_DELAY_S = 0.08;
const PROJECTS_ENTER_STEP_DELAY_S = 0.1;
const PROJECTS_VIEW_THRESHOLD = 0.14;

type ProjectsSectionProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  titleLines?: HeroHeadlineLine[];
  subtitle?: string;
  projects: ProjectWithDetails[];
  emptyMessage?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  headingId?: string;
};

function resolveTitleLines(title: string, titleLines?: HeroHeadlineLine[]): HeroHeadlineLine[] {
  if (titleLines && titleLines.length > 0) {
    return titleLines;
  }

  return [{ text: title }];
}

function projectsDelayStyle(delaySeconds: number): CSSProperties {
  return { "--projects-showcase-delay": `${delaySeconds}s` } as CSSProperties;
}

export function ProjectsSection({
  locale,
  eyebrow,
  title,
  titleLines,
  subtitle,
  projects,
  emptyMessage,
  viewAllLabel,
  viewAllHref,
  headingId = "projects-section-heading",
}: ProjectsSectionProps) {
  const { isVisible, sectionRef } = useSectionReveal({ threshold: PROJECTS_VIEW_THRESHOLD });
  const resolvedViewAllHref = viewAllHref ?? localePath(locale, "/projects");
  const resolvedTitleLines = resolveTitleLines(title, titleLines);
  const hasProjects = projects.length > 0;

  return (
    <section
      ref={sectionRef}
      className={`projects-section ${isVisible ? "projects-showcase-section--visible" : ""}`}
      aria-labelledby={headingId}
    >
      <Container className="projects-section-container">
        <article className={`projects-showcase-panel ${isVisible ? "projects-showcase-panel--active" : ""}`}>
          <div className="projects-showcase-panel-frame" aria-hidden="true">
            <span className="projects-showcase-panel-beam" />
            <span className="projects-showcase-panel-flare projects-showcase-panel-flare-tl" />
            <span className="projects-showcase-panel-flare projects-showcase-panel-flare-br" />
            <span className="projects-showcase-panel-glow projects-showcase-panel-glow-purple" />
            <span className="projects-showcase-panel-glow projects-showcase-panel-glow-cyan" />
            <span className="projects-showcase-panel-grid" />
            <span className="projects-showcase-panel-noise" />
          </div>

          <div className="projects-showcase-layout">
            <div className="projects-showcase-content">
              <span
                className="projects-showcase-badge projects-showcase-animate"
                style={projectsDelayStyle(PROJECTS_ENTER_BASE_DELAY_S)}
              >
                <span className="projects-showcase-badge-dot" aria-hidden="true" />
                {eyebrow}
              </span>

              <h2 id={headingId} className="projects-showcase-title">
                {resolvedTitleLines.map((line, index) => (
                  <span
                    key={line.text}
                    className={`projects-showcase-title-line projects-showcase-animate ${
                      line.gradient
                        ? "projects-showcase-title-gradient projects-showcase-title-gradient-animated"
                        : ""
                    }`}
                    style={projectsDelayStyle(
                      PROJECTS_ENTER_BASE_DELAY_S + (index + 1) * PROJECTS_ENTER_STEP_DELAY_S,
                    )}
                  >
                    {line.text}
                  </span>
                ))}
              </h2>

              {subtitle ? (
                <p
                  className="projects-showcase-subtitle projects-showcase-animate"
                  style={projectsDelayStyle(
                    PROJECTS_ENTER_BASE_DELAY_S + (resolvedTitleLines.length + 2) * PROJECTS_ENTER_STEP_DELAY_S,
                  )}
                >
                  {subtitle}
                </p>
              ) : null}

              <span className="projects-showcase-divider" aria-hidden="true" />

              {!hasProjects && emptyMessage ? (
                <div
                  className="projects-showcase-status projects-showcase-animate"
                  style={projectsDelayStyle(
                    PROJECTS_ENTER_BASE_DELAY_S + (resolvedTitleLines.length + 3) * PROJECTS_ENTER_STEP_DELAY_S,
                  )}
                >
                  <span className="projects-showcase-status-indicator" aria-hidden="true">
                    <span className="projects-showcase-status-ring" />
                    <span className="projects-showcase-status-core" />
                  </span>
                  <span className="projects-showcase-status-text">{emptyMessage}</span>
                </div>
              ) : null}
            </div>

            <FeaturedProjectsVisual isActive={isVisible} />
          </div>
        </article>

        {hasProjects ? (
          <>
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>

            {viewAllLabel ? (
              <div className="projects-section-footer">
                <Link href={resolvedViewAllHref} className="projects-section-view-all">
                  <span>{viewAllLabel}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="projects-section-view-all-icon"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ) : null}
          </>
        ) : null}
      </Container>
    </section>
  );
}
