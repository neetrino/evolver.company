import type { Locale } from "@/lib/i18n";
import type { ProductShowcaseAccent } from "@/lib/product-showcase";
import { staticAssetUrl } from "@/lib/static-assets";

export type ServicesShowcaseItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
  accent: ProductShowcaseAccent;
};

export type ServicesShowcaseContent = {
  title: string;
  exploreCta: string;
  items: ServicesShowcaseItem[];
};

const SERVICE_LOGO_SIZE = 280;

const SERVICE_ASSETS: Omit<
  ServicesShowcaseItem,
  "category" | "title" | "description"
>[] = [
  {
    id: "estatedata",
    logoSrc: staticAssetUrl("/images/services/estatedata-illustration.png"),
    logoWidth: SERVICE_LOGO_SIZE,
    logoHeight: SERVICE_LOGO_SIZE,
    href: "https://estatedata.am/",
    accent: "magenta",
  },
  {
    id: "vexpo",
    logoSrc: staticAssetUrl("/images/services/vexpo-illustration.png"),
    logoWidth: SERVICE_LOGO_SIZE,
    logoHeight: SERVICE_LOGO_SIZE,
    href: "https://evolver.company/",
    accent: "blue",
  },
  {
    id: "vcity",
    logoSrc: staticAssetUrl("/images/services/vcity-illustration.png"),
    logoWidth: SERVICE_LOGO_SIZE,
    logoHeight: SERVICE_LOGO_SIZE,
    href: "https://vcity.guide/",
    accent: "cyan",
  },
  {
    id: "vrealty",
    logoSrc: staticAssetUrl("/images/services/vrealty-illustration.png"),
    logoWidth: SERVICE_LOGO_SIZE,
    logoHeight: SERVICE_LOGO_SIZE,
    href: "https://vrealty.am/",
    accent: "coral",
  },
];

const SHOWCASE: Record<
  Locale,
  Omit<ServicesShowcaseContent, "items"> & {
    itemCopy: Record<
      string,
      Pick<ServicesShowcaseItem, "category" | "title" | "description">
    >;
  }
> = {
  en: {
    title: "Services",
    exploreCta: "Explore",
    itemCopy: {
      estatedata: {
        category: "Property Management",
        title: "Cloud Service for Property Owners",
        description:
          "A cloud service for homeowners and property owners, enabling them to store all their digital data in one place.",
      },
      vexpo: {
        category: "Exhibitions & Events",
        title: "Visualization of Expos & Events",
        description: "Missed an Expo? No worries. Explore with vExpo.",
      },
      vcity: {
        category: "Businesses & Organizations",
        title: "Virtual City Directory",
        description:
          "vCity is a platform that presents the top places in Armenia with 3D visualization.",
      },
      vrealty: {
        category: "Estate & Realty",
        title: "Visualization of Real Estate",
        description: "No time for commuting. Choose the house from your house!",
      },
    },
  },
  hy: {
    title: "Ծառայություններ",
    exploreCta: "Բացել",
    itemCopy: {
      estatedata: {
        category: "Գույքի կառավարում",
        title: "Ամպային ծառայություն գույքի սեփականատերերի համար",
        description:
          "Ամպային ծառայություն տան տերերի և գույքի սեփականատերերի համար՝ բոլոր թվային տվյալները մեկ տեղում պահելու համար։",
      },
      vexpo: {
        category: "Ցուցահանդեսներ և միջոցառումներ",
        title: "Ցուցահանդեսների և միջոցառումների 3D վիզուալացում",
        description: "Բաց թողե՞լ եք ցուցահանդեսը։ vExpo-ով ուսումնասիրեք այն ցանկացած ժամանակ։",
      },
      vcity: {
        category: "Բիզնես և կազմակերպություններ",
        title: "Վիրտուալ քաղաքային ուղեցույց",
        description:
          "vCity-ն հարթակ է, որը ներկայացնում է Հայաստանի լավագույն վայրերը 3D վիզուալացմամբ։",
      },
      vrealty: {
        category: "Անշարժ գույք",
        title: "Անշարժ գույքի 3D վիզուալացում",
        description: "Ժամանակ չկա՞ ճանապարհորդելու։ Ընտրեք տունը ձեր տնից։",
      },
    },
  },
};

/** Services page showcase copy and logos. */
export function getServicesShowcaseContent(locale: Locale): ServicesShowcaseContent {
  const content = SHOWCASE[locale];

  return {
    title: content.title,
    exploreCta: content.exploreCta,
    items: SERVICE_ASSETS.map((asset) => ({
      ...asset,
      ...content.itemCopy[asset.id],
    })),
  };
}
