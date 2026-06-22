import type { Locale } from "@/lib/i18n";

export type AboutHeadlineLine = {
  text: string;
  gradient?: boolean;
};

export type AboutRichPart = {
  text: string;
  emphasis?: boolean;
};

export type AboutStatItem = {
  value: string;
  label: string;
  accent: "purple" | "cyan";
};

export type AboutTechnologyItem = {
  title: string;
  description: string;
};

export type AboutSectionContent = {
  eyebrow: string;
  headline: AboutHeadlineLine[];
  supporting: string;
  companyTitle: string;
  companyParagraphs: AboutRichPart[][];
  stats: AboutStatItem[];
  technologyTitle: string;
  technologyItems: AboutTechnologyItem[];
};

const ABOUT_SECTION: Record<Locale, AboutSectionContent> = {
  en: {
    eyebrow: "About Us",
    headline: [
      { text: "WE CREATE" },
      { text: "3D DIGITAL AND" },
      { text: "INTERACTIVE CONTENT", gradient: true },
    ],
    supporting:
      "We turn complex spaces and ideas into immersive digital experiences that engage, inform and inspire.",
    companyTitle: "Company",
    companyParagraphs: [
      [
        { text: "Evolver is a leading 3D-scanning company that transforms spaces into " },
        { text: "meticulously detailed", emphasis: true },
        { text: ", " },
        { text: "immersive virtual models", emphasis: true },
        {
          text: ". We specialize in creating ultra-realistic, interactive digital environments that bring architecture, interiors, and real-world locations to life.",
        },
      ],
      [
        { text: "Our expertise spans " },
        { text: "real estate, architecture, construction, and cultural heritage", emphasis: true },
        {
          text: ", helping clients showcase properties, document sites, and communicate design intent with unmatched clarity.",
        },
      ],
      [
        { text: "From precise spatial capture to polished virtual delivery, we combine " },
        { text: "technical precision with creative vision", emphasis: true },
        { text: " to deliver experiences that elevate how spaces are seen, shared, and understood." },
      ],
    ],
    stats: [
      { value: "100+", label: "Implemented Projects", accent: "purple" },
      { value: "600000+", label: "Sq.m scanned and digitized area", accent: "cyan" },
    ],
    technologyTitle: "Technology",
    technologyItems: [
      {
        title: "3D Laser Scanning",
        description: "High-precision spatial capture for accurate digital twins and as-built documentation.",
      },
      {
        title: "Photogrammetry & Point Clouds",
        description: "Advanced processing pipelines that transform raw capture data into usable 3D assets.",
      },
      {
        title: "Virtual Tours & BIM",
        description: "Interactive walkthroughs and structured spatial models for design, sales, and operations.",
      },
      {
        title: "Web-Based Delivery",
        description: "Fast, immersive experiences optimized for modern browsers and mobile devices.",
      },
    ],
  },
  hy: {
    eyebrow: "Մեր մասին",
    headline: [
      { text: "ՄԵՆՔ ՍՏԵՂԾՈՒՄ ԵՆՔ" },
      { text: "3D ԹՎԱՅԻՆ ԵՎ" },
      { text: "ԻՆՏԵՐԱԿՏԻՎ ԲՈՎԱՆԴԱԿՈՒԹՅՈՒՆ", gradient: true },
    ],
    supporting:
      "Մենք բարդ տարածություններն ու գաղափարները վերածում ենք լիարժեք թվային փորձառությունների, որոնք ոգևորում, տեղեկացնում և ոգեշնչում են։",
    companyTitle: "Ընկերություն",
    companyParagraphs: [
      [
        { text: "Evolver-ը առաջատար 3D սկանավորող ընկերություն է, որը տարածությունները վերածում է " },
        { text: "մանրամասն նկարագրված", emphasis: true },
        { text: ", " },
        { text: "լիարժեք վիրտուալ մոդելների", emphasis: true },
        {
          text: "։ Մենք ստեղծում ենք գերռեալիստական, ինտերակտիվ թվային միջավայրեր, որոնք կյանքի են կոչում ճարտարապետությունը, ինտերիերները և իրական տեղանքները։",
        },
      ],
      [
        { text: "Մեր փորձը ոխհատվում է " },
        { text: "անշարի գույք, չարտարապետություն, կարուցապատում և մշակութային ժարանգություն", emphasis: true },
        {
          text: "։ Օգնելով հաճախորդներին ցուցադրել ոբյեկտները, փաստաթոբտավորել տարացութները և հստակ կերպով ներկայացնել դիզայնի գագաճարը։",
        },
      ],
      [
        { text: "Չշգրիտ տարացական գրանումից մինչև պատրաստի վիրտուալ փոխանցում։ Մենք միավորում ենք " },
        { text: "տեխնիկական չշգրտություն և ստեբզագորթական տեսախան", emphasis: true },
        { text: "։ Փորձարություններ, որոնք բարցրացնում են տարացութները տեսնելու, կիսելու և հասկանալու ձևը։" },
      ],
    ],
    stats: [
      { value: "100+", label: "Իրականացված նախագիշ", accent: "purple" },
      { value: "600000+", label: "Սկանավորված և չվայինացված տարացք", accent: "cyan" },
    ],
    technologyTitle: "Տեխնոլոգիա",
    technologyItems: [
      {
        title: "3D լազերային սկանավորում",
        description: "Բարռր չշգրտության տարացական գրանում չշգրիտ չվային երկորյակների համար։",
      },
      {
        title: "Ֆոտոգրամմետրիա և point cloud",
        description: "Ենդլայնված մշակման pipeline-ներ, որոնք դրրը չվային 3D ակտիվների են։",
      },
      {
        title: "Բիրտուալ տուրեր և BIM",
        description: "Ինտերակտիվ walkthrough-ներ և կարգավորման մոդելներ դիզայնի, վափարկի և գործունություների համար։",
      },
      {
        title: "Web-based արաքում",
        description: "Արագ, լիարիեք փորձարություններ բրաուզերի և կինեկի սարքերի համար։",
      },
    ],
  },
};

/** Homepage About section copy, stats, and technology list. */
export function getAboutSectionContent(locale: Locale): AboutSectionContent {
  return ABOUT_SECTION[locale];
}
