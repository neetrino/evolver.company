import "server-only";

import { unstable_cache } from "next/cache";
import { toSameOriginCdnPath } from "@/lib/cdn-image";
import { getHomeHeroSlidesForStorefront } from "@/lib/home-hero";
import type { HomeHeroSlide } from "@/lib/home-hero-types";
import { getFeaturedProjects } from "@/lib/projects";

const HOME_STOREFRONT_REVALIDATE_SECONDS = 60;

function normalizeHeroSlides(slides: HomeHeroSlide[]): HomeHeroSlide[] {
  return slides.map((slide) => ({
    ...slide,
    imageUrl: toSameOriginCdnPath(slide.imageUrl),
    mobileImageUrl: slide.mobileImageUrl
      ? toSameOriginCdnPath(slide.mobileImageUrl)
      : slide.mobileImageUrl,
  }));
}

export const getCachedHomeHeroSlides = unstable_cache(
  async () => normalizeHeroSlides(await getHomeHeroSlidesForStorefront("en")),
  ["home-storefront-hero-slides"],
  { revalidate: HOME_STOREFRONT_REVALIDATE_SECONDS, tags: ["home-hero"] },
);

export const getCachedFeaturedProjects = unstable_cache(
  async () => getFeaturedProjects(3),
  ["home-storefront-featured-projects"],
  { revalidate: HOME_STOREFRONT_REVALIDATE_SECONDS, tags: ["projects"] },
);
