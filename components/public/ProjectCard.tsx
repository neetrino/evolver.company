import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { getProjectTranslation } from "@/lib/project-types";
import type { ProjectWithDetails } from "@/lib/project-types";

type ProjectCardProps = {
  project: ProjectWithDetails;
  locale: Locale;
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const translation = getProjectTranslation(project, locale);

  if (!translation) {
    return null;
  }

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="project-card"
    >
      <div className="project-card-image">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={translation.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No cover
          </div>
        )}
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{translation.title}</h3>
        <p className="project-card-text">{translation.shortDescription}</p>
      </div>
    </Link>
  );
}
