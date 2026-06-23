import type { Locale } from "@/lib/i18n";
import {
  getProductAsset,
  getProductShowcaseContent,
  type ProductShowcaseAccent,
} from "@/lib/product-showcase";

const ABOUT_PROJECT_ORDER = ["estatedata", "vexpo", "vcity", "vrealty"] as const;

export type AboutUsProjectItem = {
  id: string;
  title: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
  accent: ProductShowcaseAccent;
};

export type AboutUsProjectsContent = {
  eyebrow: string;
  headline: string;
  items: AboutUsProjectItem[];
};

const ABOUT_PROJECTS_COPY: Record<
  Locale,
  Pick<AboutUsProjectsContent, "eyebrow" | "headline">
> = {
  en: {
    eyebrow: "3D Innovations",
    headline: "Projects powered by Evolver.",
  },
  hy: {
    eyebrow: "3D նորարարություններ",
    headline: "Evolver-ով ստեղծված նախագծեր։",
  },
};

/** About page project logo row copy and assets. */
export function getAboutUsProjectsContent(locale: Locale): AboutUsProjectsContent {
  const copy = ABOUT_PROJECTS_COPY[locale];
  const products = getProductShowcaseContent(locale).products;

  const items = ABOUT_PROJECT_ORDER.map((id) => {
    const asset = getProductAsset(id);
    const product = products.find((entry) => entry.id === id);
    if (!product) {
      throw new Error(`Unknown about page project: ${id}`);
    }

    return {
      id: asset.id,
      title: product.title,
      logoSrc: asset.logoSrc,
      logoWidth: asset.logoWidth,
      logoHeight: asset.logoHeight,
      href: asset.href,
      accent: asset.accent,
    };
  });

  return {
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    items,
  };
}
