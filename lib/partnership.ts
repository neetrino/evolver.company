import type { ProjectsPageCtaContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export type PartnershipContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  partners: {
    eyebrow: string;
    headline: string;
  };
  cta: ProjectsPageCtaContent;
};

const PARTNERSHIP: Record<Locale, PartnershipContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Partnership",
      subtitle: "Brands and organizations we build immersive experiences with.",
    },
    partners: {
      eyebrow: "Our partners",
      headline: "Companies that trust Evolver",
    },
    cta: {
      ctaEyebrow: "Start a partnership",
      ctaTitle: "Ready to build together?",
      ctaBody:
        "Share a short note about your company and how you’d like to partner. Our team will follow up shortly.",
      ctaLabel: "Contact us",
    },
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Գործընկերություն",
      subtitle: "Բրենդներ և կազմակերպություններ, որոնց հետ ստեղծում ենք immersive փորձառություններ։",
    },
    partners: {
      eyebrow: "Մեր գործընկերները",
      headline: "Ընկերություններ, որոնք վստահում են Evolver-ին",
    },
    cta: {
      ctaEyebrow: "Սկսել գործընկերություն",
      ctaTitle: "Պատրա՞ստ եք միասին կառուցել",
      ctaBody:
        "Կիսվեք կարճ նշումով ձեր ընկերության և գործընկերության ձևի մասին։ Մեր թիմը շուտով կկապվի ձեզ հետ։",
      ctaLabel: "Կապ մեզ հետ",
    },
  },
};

export function getPartnershipContent(locale: Locale): PartnershipContent {
  return PARTNERSHIP[locale];
}
