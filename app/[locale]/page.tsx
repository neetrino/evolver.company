import dynamic from "next/dynamic";
import "@/app/home-sections.css";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { getHomeContent } from "@/lib/content";
import { getHomeHeroSlidesForStorefront } from "@/lib/home-hero";
import type { Locale } from "@/lib/i18n";
import { getFeaturedProjects } from "@/lib/projects";

const WhatWeDoSection = dynamic(() =>
  import("@/components/public/WhatWeDoSection").then((module) => ({
    default: module.WhatWeDoSection,
  })),
);

const VideoShowcaseSection = dynamic(() =>
  import("@/components/public/VideoShowcaseSection").then((module) => ({
    default: module.VideoShowcaseSection,
  })),
);

const ProjectsSection = dynamic(() =>
  import("@/components/public/ProjectsSection").then((module) => ({
    default: module.ProjectsSection,
  })),
);

const AboutSection = dynamic(() =>
  import("@/components/public/AboutSection").then((module) => ({
    default: module.AboutSection,
  })),
);

const TrustedBySection = dynamic(() =>
  import("@/components/public/TrustedBySection").then((module) => ({
    default: module.TrustedBySection,
  })),
);

export const revalidate = 60;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getHomeContent(locale);
  const [heroSlides, featuredProjects] = await Promise.all([
    getHomeHeroSlidesForStorefront(locale),
    getFeaturedProjects(3),
  ]);

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
