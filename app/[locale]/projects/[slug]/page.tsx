import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { UI_LABELS, localePath, type Locale } from "@/lib/i18n";
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

  if (!translation.title) {
    notFound();
  }

  const backLabel = locale === "en" ? "Back to projects" : "Վերադառնալ նախագծեր";

  return (
    <article className="project-detail">
      <div className="project-detail-backdrop" aria-hidden="true">
        <span className="project-detail-glow project-detail-glow-purple" />
        <span className="project-detail-glow project-detail-glow-cyan" />
      </div>

      <Container className="project-detail-container">
        <Link href={localePath(locale, "/projects")} className="project-detail-back">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="project-detail-back-icon">
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{backLabel}</span>
        </Link>

        <div className="project-detail-layout">
          <header className="project-detail-info">
            <p className="project-detail-eyebrow">{UI_LABELS[locale].projectsHeading}</p>
            <span className="project-detail-eyebrow-line" aria-hidden="true" />
            <h1 className="project-detail-title">{translation.title}</h1>
            <p className="project-detail-description">{translation.longDescription}</p>
            {project.projectUrl ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-external btn btn-primary"
              >
                {UI_LABELS[locale].openProject}
              </a>
            ) : null}
          </header>

          <div className="project-detail-gallery">
            {project.coverImage ? (
              <figure className="project-detail-figure project-detail-figure-cover">
                <Image
                  src={project.coverImage}
                  alt={translation.title}
                  width={1200}
                  height={750}
                  unoptimized
                  className="project-detail-image"
                  priority
                />
              </figure>
            ) : null}
            {project.images.map((image, index) => (
              <figure key={`${image.url}-${index}`} className="project-detail-figure">
                <Image
                  src={image.url}
                  alt={translation.title}
                  width={1200}
                  height={800}
                  unoptimized
                  className="project-detail-image"
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
