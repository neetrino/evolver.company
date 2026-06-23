import "@/app/projects-page.css";
import { ProjectsPortfolioPage } from "@/components/public/ProjectsPortfolioPage";
import { getProjectsPageContent } from "@/lib/content";
import { UI_LABELS, type Locale } from "@/lib/i18n";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getProjectsPageContent(locale);
  const projects = await getPublishedProjects();

  return (
    <ProjectsPortfolioPage
      locale={locale}
      content={content}
      projects={projects}
      emptyMessage={UI_LABELS[locale].noProjects}
    />
  );
}
