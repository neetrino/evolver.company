"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { UI_LABELS } from "@/lib/i18n";
import {
  getProjectVisual,
  getProjectLogo,
  resolveHomeProjectImage,
} from "@/lib/project-visuals";
import { getProjectTranslation } from "@/lib/project-types";
import type { ProjectWithDetails } from "@/lib/project-types";

const HOME_PROJECT_MEDIA_ASPECT = "16 / 10";
const HOME_PROJECT_DELAY_STEP_S = 0.15;

type ProjectCardEnter = "left" | "center" | "right";

type ProjectCardProps = {
  project: ProjectWithDetails;
  locale: Locale;
  index?: number;
};

function resolveEnterVariant(index: number): ProjectCardEnter {
  if (index === 1) {
    return "center";
  }

  if (index === 2) {
    return "right";
  }

  return "left";
}

function cardStyle(index: number): CSSProperties {
  return {
    "--home-project-delay": `${index * HOME_PROJECT_DELAY_STEP_S}s`,
  } as CSSProperties;
}

function CardArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="home-project-card-cta-icon">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const translation = getProjectTranslation(project, locale);
  const viewLabel = UI_LABELS[locale].viewProject;
  const visual = getProjectVisual(project.slug);
  const logo = getProjectLogo(project.slug);
  const illustrationSrc = resolveHomeProjectImage(project.slug, project.coverImage);
  const cardIndex = String(index + 1).padStart(2, "0");

  if (!translation.title) {
    return null;
  }

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="home-project-card"
      data-accent={visual.accent}
      data-enter={resolveEnterVariant(index)}
      style={cardStyle(index)}
      aria-label={`${viewLabel}: ${translation.title}`}
    >
      <span className="home-project-card-surface">
        <span className="home-project-card-accent-rail" aria-hidden="true" />

        <header className="home-project-card-top">
          {logo ? (
            <span className="home-project-card-brand">
              <Image
                src={logo.logoSrc}
                alt=""
                width={logo.logoWidth}
                height={logo.logoHeight}
                className="home-project-card-logo"
                sizes="120px"
              />
              <span className="home-project-card-brand-name">{translation.title}</span>
            </span>
          ) : (
            <span className="home-project-card-brand home-project-card-brand--text">
              {translation.title}
            </span>
          )}
          <span className="home-project-card-index" aria-hidden="true">
            {cardIndex}
          </span>
        </header>

        <div
          className="home-project-card-frame"
          style={{ aspectRatio: HOME_PROJECT_MEDIA_ASPECT }}
        >
          <div className="home-project-card-media">
            <span className="home-project-card-media-stage" aria-hidden="true" />
            {illustrationSrc ? (
              <Image
                src={illustrationSrc}
                alt=""
                fill
                priority={index < 3}
                className="home-project-card-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            ) : (
              <div className="home-project-card-placeholder">
                <span>{translation.title.charAt(0)}</span>
              </div>
            )}
            <span className="home-project-card-scan" aria-hidden="true" />
            <span className="home-project-card-media-fade" aria-hidden="true" />
          </div>
        </div>

        <div className="home-project-card-body">
          <h3 className="home-project-card-title">{translation.title}</h3>
          <p className="home-project-card-text">{translation.shortDescription}</p>
          <span className="home-project-card-cta">
            <span className="home-project-card-cta-label">{viewLabel}</span>
            <span className="home-project-card-cta-line" aria-hidden="true" />
            <CardArrowIcon />
          </span>
        </div>
      </span>
    </Link>
  );
}
