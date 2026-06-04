import Image from "next/image";
import { notFound } from "next/navigation";
import { UI_LABELS, type Locale } from "@/lib/i18n";
import { getProjectTranslation, getPublishedProjectBySlug } from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const translation = getProjectTranslation(project, locale);

  if (!translation) {
    notFound();
  }

  return (
    <div className="project-page">
      <div className="project-info">
        <h1>{translation.title}</h1>
        <p>{translation.longDescription}</p>
        {project.projectUrl ? (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {UI_LABELS[locale].openProject}
          </a>
        ) : null}
      </div>
      <div className="project-images">
        {project.images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={translation.title}
            width={1200}
            height={800}
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}
