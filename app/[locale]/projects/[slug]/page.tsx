import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { UI_LABELS, type Locale } from "@/lib/i18n";
import {
  buildProjectDetailImages,
  getProjectPlaceholderLetter,
  getProjectTranslation,
  resolvePublishedProjectBySlug,
} from "@/lib/projects";

export const revalidate = 60;

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const lookup = await resolvePublishedProjectBySlug(slug);

  if (!lookup) {
    notFound();
  }

  if (lookup.kind === "redirect") {
    redirect(`/${locale}/projects/${lookup.targetSlug}`);
  }

  const project = lookup.project;

  const translation = getProjectTranslation(project, locale);

  if (!translation.title) {
    notFound();
  }

  const detailImages = buildProjectDetailImages(project);
  const placeholderLetter = getProjectPlaceholderLetter(translation.title, project.slug);

  return (
    <article className="project-detail">
      <div className="project-detail-backdrop" aria-hidden="true">
        <span className="project-detail-glow project-detail-glow-purple" />
        <span className="project-detail-glow project-detail-glow-cyan" />
      </div>

      <Container className="project-detail-container">
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
            {detailImages.length > 0 ? (
              detailImages.map((image, index) => (
                <figure
                  key={`${image.type}-${image.url}-${image.sortOrder}`}
                  className={
                    image.type === "cover"
                      ? "project-detail-figure project-detail-figure-cover"
                      : "project-detail-figure"
                  }
                >
                  <Image
                    src={image.url}
                    alt={translation.title}
                    width={1200}
                    height={image.type === "cover" ? 750 : 800}
                    unoptimized
                    className="project-detail-image"
                    priority={index === 0}
                  />
                </figure>
              ))
            ) : (
              <figure className="project-detail-figure project-detail-figure-cover">
                <div className="project-detail-placeholder" aria-hidden="true">
                  <span>{placeholderLetter}</span>
                </div>
              </figure>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
