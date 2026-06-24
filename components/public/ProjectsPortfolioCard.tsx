"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { useCardTilt } from "@/lib/hooks/use-card-tilt";
import { localePath, type Locale } from "@/lib/i18n";
import {
  buildPortfolioAccentStyle,
  resolveProjectAccent,
} from "@/lib/project-accent";
import { getProjectTranslation } from "@/lib/project-types";
import type { ProjectWithDetails } from "@/lib/project-types";

const PROJECT_MEDIA_ASPECT = "16 / 10";
const CARD_ENTER_STEP_S = 0.12;

type ProjectsPortfolioCardProps = {
  project: ProjectWithDetails;
  locale: Locale;
  index: number;
  viewLabel: string;
};

function cardDelayStyle(delaySeconds: number): CSSProperties {
  return { "--portfolio-card-delay": `${delaySeconds}s` } as CSSProperties;
}

function CardArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="projects-portfolio-card-arrow-icon">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectsPortfolioCard({
  project,
  locale,
  index,
  viewLabel,
}: ProjectsPortfolioCardProps) {
  const { ref, handlePointerMove, handlePointerLeave } = useCardTilt();
  const translation = getProjectTranslation(project, locale);
  const { token: accentToken, accentColor } = resolveProjectAccent(project);
  const accentStyle = buildPortfolioAccentStyle(accentColor);
  const coverSrc = project.coverImage;

  if (!translation.title) {
    return null;
  }

  return (
    <article
      className="projects-portfolio-card-wrap"
      data-accent={accentToken}
      style={{ ...cardDelayStyle(index * CARD_ENTER_STEP_S), ...accentStyle }}
    >
      <Link
        ref={ref}
        href={localePath(locale, `/projects/${project.slug}`)}
        className="projects-portfolio-card"
        data-accent={accentToken}
        data-index={index}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={`${viewLabel}: ${translation.title}`}
      >
        <span className="projects-portfolio-card-aura" aria-hidden="true" />
        <span className="projects-portfolio-card-spotlight" aria-hidden="true" />

        <div
          className="projects-portfolio-card-media"
          style={{ aspectRatio: PROJECT_MEDIA_ASPECT }}
        >
          <span className="projects-portfolio-card-media-frame" aria-hidden="true" />
          <span className="projects-portfolio-card-media-shimmer" aria-hidden="true" />
          <span className="projects-portfolio-card-media-glow" aria-hidden="true" />

          {coverSrc ? (
            <Image
              src={coverSrc}
              alt=""
              fill
              unoptimized
              priority={index < 3}
              className="projects-portfolio-card-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="projects-portfolio-card-placeholder">
              <span>{translation.title.charAt(0)}</span>
            </div>
          )}

          <span className="projects-portfolio-card-media-vignette" aria-hidden="true" />
          <span className="projects-portfolio-card-hover-arrow" aria-hidden="true">
            <CardArrowIcon />
          </span>
        </div>
      </Link>

      <div className="projects-portfolio-card-copy">
        <h2 className="projects-portfolio-card-title">{translation.title}</h2>
        <p className="projects-portfolio-card-description">{translation.shortDescription}</p>
      </div>
    </article>
  );
}
