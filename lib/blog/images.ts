import { HOME_HERO_IMAGE } from "@/lib/home-hero-image";

export const BLOG_DEFAULT_IMAGE = HOME_HERO_IMAGE.src;

export function blogCardImage(image: string | null): string {
  return image || BLOG_DEFAULT_IMAGE;
}

export function blogHeroImage(headerImage: string | null, image: string | null): string {
  return headerImage || image || BLOG_DEFAULT_IMAGE;
}

export function blogHomeImage(image: string | null, headerImage: string | null): string {
  return image || headerImage || BLOG_DEFAULT_IMAGE;
}
