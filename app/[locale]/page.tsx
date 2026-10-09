import dynamic from "next/dynamic";
import "@/app/home-sections.css";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { ViewportLazy } from "@/components/shared/ViewportLazy";
import type { HomeContent } from "@/lib/content";
import type { AboutSectionContent } from "@/lib/about-section";
import { type TrustedBySectionContent } from "@/lib/clients-section";
import { type HomeVideoSectionCopy } from "@/lib/home-videos";
import { resolveClientLogos, resolvePageCopy } from "@/lib/page-copy/resolve";
import { type ProductShowcaseContent } from "@/lib/product-showcase";
import { HomeBlogStories } from "@/components/public/blog/HomeBlogStories";
import { getHomeBlogStories } from "@/lib/blog/queries";
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
  const [content, showcase, aboutSection, trusted, videoCopy, logos, heroSlides, featuredProjects, blogStories] =
    await Promise.all([
    resolvePageCopy<HomeContent & { emptyProjects: string }>("home", locale),
    resolvePageCopy<ProductShowcaseContent>("what-we-do", locale),
    resolvePageCopy<AboutSectionContent>("home-about", locale),
    resolvePageCopy<TrustedBySectionContent>("trusted-by", locale),
    resolvePageCopy<HomeVideoSectionCopy>("home-videos", locale),
    resolveClientLogos(locale),
    getCachedHomeHeroSlides(),
    getCachedFeaturedProjects(),
    getHomeBlogStories(locale),
  ]);

  return (
    <div className="home-page">
      <HeroCarousel slides={heroSlides} locale={locale} hero={content.hero} />

      <ViewportLazy minHeight="520px">
        <WhatWeDoSection locale={locale} content={showcase} />
      </ViewportLazy>

      <ViewportLazy minHeight="640px">
        <VideoShowcaseSection locale={locale} copy={videoCopy} />
      </ViewportLazy>

      <ViewportLazy minHeight="720px">
        <ProjectsSection
          locale={locale}
          eyebrow={content.featuredEyebrow}
          title={content.featuredTitle}
          titleLines={content.featuredTitleLines}
          subtitle={content.featuredSubtitle}
          projects={featuredProjects}
          emptyMessage={content.emptyProjects}
          viewAllLabel={content.viewAllProjects}
        />
      </ViewportLazy>

      <ViewportLazy minHeight="560px">
        <HomeBlogStories locale={locale} posts={blogStories} />
      </ViewportLazy>

      <ViewportLazy minHeight="560px">
        <AboutSection locale={locale} content={aboutSection} />
      </ViewportLazy>

      <ViewportLazy minHeight="480px">
        <TrustedBySection locale={locale} content={trusted} logos={logos} />
      </ViewportLazy>
    </div>
  );
}
