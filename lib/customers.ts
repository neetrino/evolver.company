import type { ProjectsPageCtaContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getClientLogos, type ClientLogo } from "@/lib/clients-section";

export type CustomersContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  spotlight: {
    eyebrow: string;
    headline: string;
    subtitle: string;
  };
  gallery: {
    eyebrow: string;
    headline: string;
  };
  cta: ProjectsPageCtaContent;
};

export type CustomerSpotlightItem = {
  client: ClientLogo;
  industry: string;
};

const FEATURED_CLIENT_IDS = [
  "audi",
  "picsart",
  "krisp",
  "ucom",
  "orange",
  "min-economy",
] as const;

const INDUSTRY_BY_ID: Record<string, Record<Locale, string>> = {
  audi: { en: "Automotive", hy: "Ավտոմոբիլային" },
  picsart: { en: "Creative tech", hy: "Creative tech" },
  krisp: { en: "AI · Audio", hy: "AI · Աուդիո" },
  ucom: { en: "Telecom", hy: "Հեռահաղորդակցություն" },
  orange: { en: "Telecom", hy: "Հեռահաղորդակցություն" },
  "min-economy": { en: "Public sector", hy: "Պետական հատված" },
  tcl: { en: "Consumer electronics", hy: "Էլեկտրոնիկա" },
  sofi: { en: "Fintech", hy: "Fintech" },
  logos: { en: "Media", hy: "Մեդիա" },
  "big-projects": { en: "Real estate", hy: "Անշարժ գույք" },
  volo: { en: "Software", hy: "Ծրագրային" },
  gazprom: { en: "Energy", hy: "Էներգետիկա" },
  uate: { en: "Industry", hy: "Արդյունաբերություն" },
  arloopa: { en: "XR · AR", hy: "XR · AR" },
  "prom-expo": { en: "Exhibitions", hy: "Ցուցահանդեսներ" },
  skill: { en: "Education", hy: "Կրթություն" },
  toto: { en: "Retail", hy: "Մանրածախ" },
  archangel: { en: "Investment", hy: "Ներդրումներ" },
};

const CUSTOMERS: Record<Locale, CustomersContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Customers",
      subtitle: "Brands that trust us to shape immersive digital experiences.",
    },
    spotlight: {
      eyebrow: "Selected work",
      headline: "Teams we deliver for",
      subtitle: "From automotive and telecom to creative platforms and public institutions.",
    },
    gallery: {
      eyebrow: "Full roster",
      headline: "Everyone in the circle",
    },
    cta: {
      ctaEyebrow: "Become a customer",
      ctaTitle: "Let’s build your next experience",
      ctaBody:
        "Tell us about your product, audience, and ambition — we’ll reply with a clear next step.",
      ctaLabel: "Contact us",
    },
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Հաճախորդներ",
      subtitle: "Բրենդներ, որոնք վստահում են մեզ immersive թվային փորձառություններ ստեղծելու համար։",
    },
    spotlight: {
      eyebrow: "Ընտրված աշխատանք",
      headline: "Թիմեր, որոնց համար առաքում ենք",
      subtitle: "Ավտոմոբիլայինից և հեռահաղորդակցությունից մինչև creative պլատֆորմներ և պետական կառույցներ։",
    },
    gallery: {
      eyebrow: "Ամբողջ ցանկ",
      headline: "Բոլորը շրջանակում",
    },
    cta: {
      ctaEyebrow: "Դառնալ հաճախորդ",
      ctaTitle: "Եկեք կառուցենք ձեր հաջորդ փորձառությունը",
      ctaBody:
        "Պատմեք ձեր արտադրանքի, լսարանի և նպատակի մասին — մենք կպատասխանենք հստակ հաջորդ քայլով։",
      ctaLabel: "Կապ մեզ հետ",
    },
  },
};

export function getCustomersContent(locale: Locale): CustomersContent {
  return CUSTOMERS[locale];
}

export function getCustomerIndustry(clientId: string, locale: Locale): string {
  return INDUSTRY_BY_ID[clientId]?.[locale] ?? (locale === "hy" ? "Գործընկեր" : "Partner");
}

export function getFeaturedCustomers(locale: Locale): CustomerSpotlightItem[] {
  const byId = new Map(getClientLogos().map((client) => [client.id, client]));

  return FEATURED_CLIENT_IDS.flatMap((id) => {
    const client = byId.get(id);
    if (!client) {
      return [];
    }

    return [
      {
        client,
        industry: getCustomerIndustry(id, locale),
      },
    ];
  });
}

export function getAllCustomers(): ClientLogo[] {
  return getClientLogos();
}
