import type { Locale } from "@/lib/i18n";

export type BlogPageContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  emptyMessage: string;
  readMore: string;
  backToBlog: string;
};

const BLOG_PAGE: Record<Locale, BlogPageContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Blog",
      subtitle: "Stories, updates, and insights from our immersive studio.",
    },
    emptyMessage: "No published posts yet.",
    readMore: "Read more",
    backToBlog: "Back to blog",
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Բլոգ",
      subtitle: "Պատմություններ, թարմացումներ և գաղափարներ մեր immersive ստուդիայից։",
    },
    emptyMessage: "Դեռ հրապարակված գրառումներ չկան։",
    readMore: "Կարդալ ավելին",
    backToBlog: "Վերադառնալ բլոգ",
  },
};

export function getBlogPageContent(locale: Locale): BlogPageContent {
  return BLOG_PAGE[locale];
}
