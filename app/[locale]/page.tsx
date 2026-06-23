import dynamic from "next/dynamic";
import "@/app/home-sections.css";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { ViewportLazy } from "@/components/shared/ViewportLazy";
import { getHomeContent } from "@/lib/content";
import {
  getCachedFeaturedProjects,
  getCachedHomeHeroSlides,
} from "@/lib/home-storefront-cache";
import type { Locale } from "@/lib/i18n";

const WhatWeDoSection = dynamic(
  () =>
    import("@/components/public/WhatWeDoSection").then((module) => ({
      default: module.WhatWeDoSection,
    })),
  { loading: () => null },
);

const VideoShowcaseSection = dynamic(
  () =>
    import("@/components/public/VideoShowcaseSection").then((module) => ({
      default: module.VideoShowcaseSection,
    })),
  { loading: () => null },
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/public/ProjectsSection").then((module) => ({
      default: module.ProjectsSection,
    })),
  { loading: () => null },
);

const AboutSection = dynamic(
  () =>
    import("@/components/public/AboutSection").then((module) => ({
      default: module.AboutSection,
    })),
  { loading: () => null },
);

const TrustedBySection = dynamic(
  () =>
    import("@/components/public/TrustedBySection").then((module) => ({
      default: module.TrustedBySection,
    })),
  { loading: () => null },
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
    getCachedHomeHeroSlides(),
    getCachedFeaturedProjects(),
  ]);

  return (
    <div className="home-page">
      <HeroCarousel slides={heroSlides} locale={locale} />

      <ViewportLazy minHeight="520px">
        <WhatWeDoSection locale={locale} />
      </ViewportLazy>

      <ViewportLazy minHeight="640px">
        <VideoShowcaseSection locale={locale} />
      </ViewportLazy>

      <ViewportLazy minHeight="720px">
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
      </ViewportLazy>

      <ViewportLazy minHeight="560px">
        <AboutSection locale={locale} />
      </ViewportLazy>

      <ViewportLazy minHeight="480px">
        <TrustedBySection locale={locale} />
      </ViewportLazy>
    </div>
  );
}
