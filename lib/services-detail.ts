import type { Locale } from "@/lib/i18n";
import { getProductAsset, type ProductShowcaseAccent } from "@/lib/product-showcase";

export type ServiceDetailFeature = {
  text: string;
};

export type ServiceDetailBlock = {
  id: string;
  brandName: string;
  title: string;
  body: string;
  features: ServiceDetailFeature[];
  ctaLabel: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  accent: ProductShowcaseAccent;
  reversed?: boolean;
};

export type ServicesDetailContent = {
  blocks: ServiceDetailBlock[];
};

export const SERVICE_DETAIL_SECTION_ID_PREFIX = "service-detail";

export const SERVICE_DETAIL_ACCENT_GLOW: Record<ProductShowcaseAccent, string> = {
  magenta: "rgba(233, 30, 140, 0.38)",
  blue: "rgba(91, 140, 255, 0.38)",
  cyan: "rgba(0, 209, 255, 0.34)",
  coral: "rgba(255, 92, 122, 0.36)",
};

/** DOM id for a services page deep-dive block. */
export function getServiceDetailSectionId(serviceId: string): string {
  return `${SERVICE_DETAIL_SECTION_ID_PREFIX}-${serviceId}`;
}

/** Smooth-scroll to a service detail block on the current page. */
export function scrollToServiceDetail(serviceId: string): boolean {
  const target = document.getElementById(getServiceDetailSectionId(serviceId));
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${getServiceDetailSectionId(serviceId)}`);
  return true;
}

const DETAIL_LAYOUT: Record<string, Pick<ServiceDetailBlock, "reversed">> = {
  vexpo: { reversed: true },
  vrealty: { reversed: true },
};

const DETAIL: Record<
  Locale,
  Record<
    string,
    Pick<ServiceDetailBlock, "brandName" | "title" | "body" | "features" | "ctaLabel">
  >
> = {
  en: {
    estatedata: {
      brandName: "ESTATEDATA",
      title: "Cloud Service for Property Owners",
      body: "ESTATE DATA involves creating a 3D virtual model of the property and enhancing it with furniture, decor, and other design elements. Our goal is to provide an immersive and engaging experience that showcases the true potential of the property, while also allowing buyers to visualize their own design preferences and make informed decisions.",
      features: [
        { text: "2D/3D Floor Plans" },
        { text: "3D Walkthroughs" },
        { text: "Virtual Staging Data" },
        { text: "Images & Videos" },
        { text: "Architectural Schemes and Diagrams" },
      ],
      ctaLabel: "Learn More",
    },
    vexpo: {
      brandName: "VEXPO",
      title: "Visualization of Expos & Events",
      body: "vExpo transforms physical exhibitions into immersive virtual experiences. Explore expo halls, interact with booths, and discover products from anywhere — without missing a single showcase moment.",
      features: [
        { text: "Virtual Expo Halls" },
        { text: "Interactive 3D Booths" },
        { text: "Live & On-demand Events" },
        { text: "Product Showcases" },
        { text: "Global Audience Reach" },
      ],
      ctaLabel: "Learn More",
    },
    vcity: {
      brandName: "VCITY",
      title: "Virtual City Directory",
      body: "vCity is a platform that presents the top places in Armenia with 3D visualization. Walk through streets, discover venues, and explore the city virtually before you visit.",
      features: [
        { text: "3D City Maps" },
        { text: "Interactive Location Pins" },
        { text: "Business Listings" },
        { text: "Immersive Walkthroughs" },
        { text: "Top Places in Armenia" },
      ],
      ctaLabel: "Learn More",
    },
    vrealty: {
      brandName: "VREALTY",
      title: "Visualization of Real Estate",
      body: "No time for commuting? Choose the house from your house. vRealty delivers photorealistic 3D property tours with virtual staging, floor plans, and rich media — all in one platform.",
      features: [
        { text: "Virtual Property Tours" },
        { text: "3D Floor Plans" },
        { text: "Virtual Staging" },
        { text: "Images & Video Tours" },
        { text: "Remote Viewing Tools" },
      ],
      ctaLabel: "Learn More",
    },
  },
  hy: {
    estatedata: {
      brandName: "ESTATEDATA",
      title: "Ամպային ծառայություն գույքի սեփականատերերի համար",
      body: "ESTATE DATA-ն ներառում է գույքի 3D վիրտուալ մոդելի ստեղծում և դրա հարստացում կահույքով, դեկորով և այլ դիզայնային տարրերով։ Մեր նպատակն է ապահովել լիարժեք և հետաքրքիր փորձառություն, որը ցուցադրում է գույքի ամբողջ պոտենցիալը և թույլ է տալիս գնորդներին պատկերացնել իրենց դիզայնային նախընտրությունները։",
      features: [
        { text: "2D/3D հատակագծեր" },
        { text: "3D Walkthrough-ներ" },
        { text: "Վիրտուալ staging տվյալներ" },
        { text: "Նկարներ և վիդեոներ" },
        { text: "Ճարտարապետական սխեմաներ և դիագրամներ" },
      ],
      ctaLabel: "Իմանալ ավելին",
    },
    vexpo: {
      brandName: "VEXPO",
      title: "Ցուցահանդեսների և միջոցառումների վիզուալացում",
      body: "vExpo-ն ֆիզիկական ցուցահանդեսները վերածում է լիարժեք վիրտուալ փորձառության։ Ուսումնասիրեք expo դահլիճները, փոխազդեք stand-երի հետ և բացահայտեք արտադրանքները ցանկացած վայրից։",
      features: [
        { text: "Վիրտուալ expo դահլիճներ" },
        { text: "Ինտերակտիվ 3D stand-եր" },
        { text: "Live և on-demand միջոցառումներ" },
        { text: "Ապրանքների ցուցադրություն" },
        { text: "Գլոբալ լսարան" },
      ],
      ctaLabel: "Իմանալ ավելին",
    },
    vcity: {
      brandName: "VCITY",
      title: "Վիրտուալ քաղաքային ուղեցույց",
      body: "vCity-ն հարթակ է, որը ներկայացնում է Հայաստանի լավագույն վայրերը 3D վիզուալացմամբ։ Քայլեք փողոցներով, բացահայտեք վայրերը և ուսումնասիրեք քաղաքը վիրտուալ կերպով։",
      features: [
        { text: "3D քաղաքային քարտեր" },
        { text: "Ինտերակտիվ location pin-եր" },
        { text: "Բիզնես ցանկեր" },
        { text: "Լիարժեք walkthrough-ներ" },
        { text: "Հայաստանի լավագույն վայրեր" },
      ],
      ctaLabel: "Իմանալ ավելին",
    },
    vrealty: {
      brandName: "VREALTY",
      title: "Անշարժ գույքի վիզուալացում",
      body: "Ժամանակ չկա՞ ճանապարհորդելու։ Ընտրեք տունը ձեր տնից։ vRealty-ն առաջարկում է ֆոտորեալիստիկ 3D property tour-եր, virtual staging, հատակագծեր և հարուստ մեդիա՝ մեկ հարթակում։",
      features: [
        { text: "Վիրտուալ property tour-եր" },
        { text: "3D հատակագծեր" },
        { text: "Վիրտուալ staging" },
        { text: "Նկարներ և վիդեո tour-եր" },
        { text: "Հեռակա դիտման գործիքներ" },
      ],
      ctaLabel: "Իմանալ ավելին",
    },
  },
};

const DETAIL_ORDER = ["estatedata", "vexpo", "vcity", "vrealty"] as const;

/** Deep-dive blocks for the services page. */
export function getServicesDetailContent(locale: Locale): ServicesDetailContent {
  const copy = DETAIL[locale];

  return {
    blocks: DETAIL_ORDER.map((id) => {
      const asset = getProductAsset(id);
      return {
        id: asset.id,
        href: asset.href,
        accent: asset.accent,
        logoSrc: asset.logoSrc,
        logoWidth: asset.logoWidth,
        logoHeight: asset.logoHeight,
        ...copy[id],
        ...DETAIL_LAYOUT[id],
      };
    }),
  };
}
