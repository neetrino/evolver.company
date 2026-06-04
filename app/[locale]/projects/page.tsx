import { Container } from "@/components/shared/Container";
import { ProjectCard } from "@/components/public/ProjectCard";
import { getProjectsPageContent } from "@/lib/content";
import { UI_LABELS, type Locale } from "@/lib/i18n";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getProjectsPageContent(locale);
  const projects = await getPublishedProjects();

  return (
    <>
      <section className="page-hero">
        <Container>
          <h1 className="page-hero-title">{content.title}</h1>
          <p className="page-hero-subtitle">{content.subtitle}</p>
        </Container>
      </section>

      <section className="section-sm">
        <Container>
          {projects.length === 0 ? (
            <p className="about-block">{UI_LABELS[locale].noProjects}</p>
          ) : (
            <div className="card-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
