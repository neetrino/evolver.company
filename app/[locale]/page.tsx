import { AboutSection } from "@/components/public/AboutSection";
import { TrustedBySection } from "@/components/public/TrustedBySection";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { ProjectsSection } from "@/components/public/ProjectsSection";
import { VideoShowcaseSection } from "@/components/public/VideoShowcaseSection";
import { WhatWeDoSection } from "@/components/public/WhatWeDoSection";
import { getHomeContent } from "@/lib/content";
import { getHomeHeroSlidesForStorefront } from "@/lib/home-hero";
import type { Locale } from "@/lib/i18n";
import { getFeaturedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getHomeContent(locale);
  const heroSlides = await getHomeHeroSlidesForStorefront(locale);
  const featuredProjects = await getFeaturedProjects(3);

  return (
    <div className="home-page">
      <HeroCarousel slides={heroSlides} locale={locale} />

      <WhatWeDoSection locale={locale} />

      <VideoShowcaseSection locale={locale} />

      <ProjectsSection
        locale={locale}
        eyebrow={content.featuredEyebrow}
        title={content.featuredTitle}
        titleLines={content.featuredTitleLines}
        subtitle={content.featuredSubtitle}
        projects={featuredProjects}
        emptyMessage={locale === "en" ? "Projects coming soon." : "Նախագծերը շուտով։"}
        viewAllLabel={content.viewAllProjects}
      />

      <AboutSection locale={locale} />

      <TrustedBySection locale={locale} />
    </div>
  );
}
