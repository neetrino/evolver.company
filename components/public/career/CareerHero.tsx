import { BlogHero } from "@/components/public/blog/BlogHero";
import type { CareerPageContent } from "@/lib/career-content";

type CareerHeroProps = {
  hero: CareerPageContent["hero"];
};

/** Career listing hero — same visual language as Blog. */
export function CareerHero({ hero }: CareerHeroProps) {
  return <BlogHero hero={hero} />;
}
