import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { UI_LABELS, localePath } from "@/lib/i18n";
import { getProjectTranslation } from "@/lib/project-types";
import type { ProjectWithDetails } from "@/lib/project-types";

const PROJECT_COVER_ASPECT = "16 / 10";

type ProjectCardProps = {
  project: ProjectWithDetails;
  locale: Locale;
};

function CardArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="project-card-arrow-icon"
    >
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

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const translation = getProjectTranslation(project, locale);
  const viewLabel = UI_LABELS[locale].viewProject;

  if (!translation.title) {
    return null;
  }

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="project-card"
      aria-label={`${viewLabel}: ${translation.title}`}
    >
      <span className="project-card-glow" aria-hidden="true" />
      <span className="project-card-arrow" aria-hidden="true">
        <CardArrowIcon />
      </span>

      <div
        className="project-card-media"
        style={{ aspectRatio: PROJECT_COVER_ASPECT }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={translation.title}
            fill
            unoptimized
            className="project-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : (
          <div className="project-card-placeholder">
            <span>{translation.title.charAt(0)}</span>
          </div>
        )}
        <span className="project-card-media-overlay" aria-hidden="true" />
      </div>

      <div className="project-card-body">
        <h3 className="project-card-title">{translation.title}</h3>
        <span className="project-card-accent-line" aria-hidden="true" />
        <p className="project-card-text">{translation.shortDescription}</p>
        <span className="project-card-cta">
          <span>{viewLabel}</span>
          <CardArrowIcon />
        </span>
      </div>
    </Link>
  );
}
