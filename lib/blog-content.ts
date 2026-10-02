import type { Locale } from "@/lib/i18n";

export type BlogPageContent = {
  hero: {
    kicker: string;
    title: string;
    accent: string;
    subtitle: string;
    browse: string;
  };
  emptyMessage: string;
  emptyCategory: string;
  allCategories: string;
  readMore: string;
  backToBlog: string;
  homeTitle: string;
  homeSubtitle: string;
};

const BLOG_PAGE: Record<Locale, BlogPageContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Blog",
      accent: "Stories from the studio",
      subtitle: "Stories, updates, and insights from our immersive studio.",
      browse: "Browse posts",
    },
    emptyMessage: "No published posts yet.",
    emptyCategory: "No posts in this category yet.",
    allCategories: "All",
    readMore: "Read",
    backToBlog: "Back to blog",
    homeTitle: "From the journal",
    homeSubtitle: "Selected stories from the studio.",
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Բլոգ",
      accent: "Պատմություններ ստուդիայից",
      subtitle: "Պատմություններ, թարմացումներ և գաղափարներ մեր immersive ստուդիայից։",
      browse: "Դիտել գրառումները",
    },
    emptyMessage: "Դեռ հրապարակված գրառումներ չկան։",
    emptyCategory: "Այս կատեգորիայում գրառումներ չկան։",
    allCategories: "Բոլորը",
    readMore: "Կարդալ",
    backToBlog: "Վերադառնալ բլոգ",
    homeTitle: "Օրագրից",
    homeSubtitle: "Ընտրված պատմություններ ստուդիայից։",
  },
};

export function getBlogPageContent(locale: Locale): BlogPageContent {
  return BLOG_PAGE[locale];
}
