import { AboutUsCapabilities } from "@/components/public/about/AboutUsCapabilities";
import { AboutUsHero } from "@/components/public/about/AboutUsHero";
import { AboutUsPageChrome } from "@/components/public/about/AboutUsPageChrome";
import { AboutUsProjects } from "@/components/public/about/AboutUsProjects";
import { AboutUsSectionSeam } from "@/components/public/about/AboutUsSectionSeam";
import { AboutUsTeam } from "@/components/public/about/AboutUsTeam";
import { TrustedBySection } from "@/components/public/TrustedBySection";
import { getAboutUsProjectsContent } from "@/lib/about-us-projects";
import { getAboutUsTeamContent } from "@/lib/about-us-team";
import { getAboutContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type AboutUsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getAboutContent(locale);
  const projectsContent = getAboutUsProjectsContent(locale);
  const teamContent = getAboutUsTeamContent(locale);

  return (
    <div className="about-us-page">
      <div className="about-us-page-backdrop" aria-hidden="true">
        <span className="about-us-page-aurora about-us-page-aurora-purple" />
        <span className="about-us-page-aurora about-us-page-aurora-cyan" />
        <span className="about-us-page-grid" />
        <span className="about-us-page-noise" />
      </div>

      <AboutUsHero title={content.hero.title} />

      <AboutUsSectionSeam index={0} />

      <AboutUsCapabilities
        eyebrow={content.capabilitiesEyebrow}
        headline={content.capabilitiesHeadline}
        items={content.capabilities}
      />

      <AboutUsSectionSeam index={1} />

      <AboutUsProjects content={projectsContent} />

      <AboutUsSectionSeam index={2} />

      <AboutUsTeam content={teamContent} />

      <AboutUsSectionSeam index={3} />

      <TrustedBySection locale={locale} />

      <AboutUsPageChrome locale={locale} searchLabel={content.searchLabel} />
    </div>
  );
}
