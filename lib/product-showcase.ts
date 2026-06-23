import type { Locale } from "@/lib/i18n";
import { staticAssetUrl } from "@/lib/static-assets";

export type ProductShowcaseAccent = "magenta" | "cyan" | "blue" | "coral";

export type ProductShowcaseHeadlineLine = {
  text: string;
  gradient?: boolean;
};

export type ProductShowcaseItem = {
  id: string;
  title: string;
  description: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
  accent: ProductShowcaseAccent;
};

export type ProductShowcaseContent = {
  eyebrow: string;
  headline: ProductShowcaseHeadlineLine[];
  supporting: string;
  products: ProductShowcaseItem[];
};

const PRODUCT_LOGO_DISPLAY_SIZE = 140;

const PRODUCT_ASSETS: Omit<ProductShowcaseItem, "title" | "description">[] = [
  {
    id: "estatedata",
    logoSrc: staticAssetUrl("/images/products/estatedata.png"),
    logoWidth: PRODUCT_LOGO_DISPLAY_SIZE,
    logoHeight: PRODUCT_LOGO_DISPLAY_SIZE,
    href: "https://estatedata.am/",
    accent: "magenta",
  },
  {
    id: "vcity",
    logoSrc: staticAssetUrl("/images/products/vcity.png"),
    logoWidth: PRODUCT_LOGO_DISPLAY_SIZE,
    logoHeight: PRODUCT_LOGO_DISPLAY_SIZE,
    href: "https://vcity.guide/",
    accent: "cyan",
  },
  {
    id: "vexpo",
    logoSrc: staticAssetUrl("/images/products/vexpo.png"),
    logoWidth: PRODUCT_LOGO_DISPLAY_SIZE,
    logoHeight: PRODUCT_LOGO_DISPLAY_SIZE,
    href: "https://evolver.company/",
    accent: "blue",
  },
  {
    id: "vrealty",
    logoSrc: staticAssetUrl("/images/products/vrealty.png"),
    logoWidth: PRODUCT_LOGO_DISPLAY_SIZE,
    logoHeight: PRODUCT_LOGO_DISPLAY_SIZE,
    href: "https://vrealty.am/",
    accent: "coral",
  },
];

const SHOWCASE: Record<
  Locale,
  Omit<ProductShowcaseContent, "products"> & {
    productCopy: Record<string, Pick<ProductShowcaseItem, "title" | "description">>;
  }
> = {
  en: {
    eyebrow: "What we do",
    headline: [
      { text: "Using cutting edge technologies" },
      { text: "Evolver virtualizes the world.", gradient: true },
    ],
    supporting:
      "We combine innovation, creativity, and advanced technology to build immersive digital experiences that transform the way you see the world.",
    productCopy: {
      estatedata: {
        title: "ESTATEDATA",
        description: "Experience Your Future Home Today with Our Virtual 3D Tours.",
      },
      vcity: {
        title: "VCITY",
        description: "Walk in your favorite city virtually.",
      },
      vexpo: {
        title: "VEXPO",
        description: "Missed an Expo? No worries. Explore with vExpo.",
      },
      vrealty: {
        title: "VREALTY",
        description: "Your dream homes are just one click away!",
      },
    },
  },
  hy: {
    eyebrow: "Ինչ ենք անում",
    headline: [
      { text: "Օգտագործելով նորագույն տեխնոլոգիաներ" },
      { text: "Evolver-ը վիրտուալացնում է աշխարհը։", gradient: true },
    ],
    supporting:
      "Մենք միավորում ենք նորարարությունը, ստեղծագործությունը և առաջադեմ տեխնոլոգիա՝ լիարժեք թվային փորձառություններ ստեղծելու համար, որոնք փոխում են աշխարհը տեսնելու ձևը։",
    productCopy: {
      estatedata: {
        title: "ESTATEDATA",
        description: "Զգացեք ձեր ապագա տունը այսօր՝ մեր վիրտուալ 3D տուրերով։",
      },
      vcity: {
        title: "VCITY",
        description: "Քայլեք ձեր սիրելի քաղաքում վիրտուալ կերպով։",
      },
      vexpo: {
        title: "VEXPO",
        description: "Բաց թողե՞լ եք ցուցահանդեսը։ vExpo-ով ուսումնասիրեք այն ցանկացած ժամանակ։",
      },
      vrealty: {
        title: "VREALTY",
        description: "Ձեր երազանքների տները ընդամենը մեկ սեղմումով հեռու չեն։",
      },
    },
  },
};

/** Shared product logo/href/accent assets used across homepage and services detail. */
export function getProductAsset(
  id: string,
): Omit<ProductShowcaseItem, "title" | "description"> {
  const asset = PRODUCT_ASSETS.find((product) => product.id === id);
  if (!asset) {
    throw new Error(`Unknown product asset: ${id}`);
  }
  return asset;
}

/** Product showcase copy and assets for the homepage “What we do” section. */
export function getProductShowcaseContent(locale: Locale): ProductShowcaseContent {
  const content = SHOWCASE[locale];

  return {
    eyebrow: content.eyebrow,
    headline: content.headline,
    supporting: content.supporting,
    products: PRODUCT_ASSETS.map((asset) => ({
      ...asset,
      ...content.productCopy[asset.id],
    })),
  };
}
