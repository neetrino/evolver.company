import "@/app/projects-page.css";
import { ProjectsPortfolioPage } from "@/components/public/ProjectsPortfolioPage";
import type { ContactContent, ProjectsPageContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { resolvePageCopy } from "@/lib/page-copy/resolve";
import type { PublicUiLabels } from "@/components/public/PublicChromeProvider";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const [content, ui, contact, projects] = await Promise.all([
    resolvePageCopy<ProjectsPageContent>("projects", locale),
    resolvePageCopy<PublicUiLabels>("interface", locale),
    resolvePageCopy<ContactContent>("contact", locale),
    getPublishedProjects(),
  ]);

  return (
    <ProjectsPortfolioPage
      locale={locale}
      content={content}
      projects={projects}
      emptyMessage={ui.noProjects}
      viewLabel={ui.viewProject}
      contactEmail={contact.info.email}
    />
  );
}
