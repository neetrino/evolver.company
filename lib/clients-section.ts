import type { Locale } from "@/lib/i18n";

export type ClientLogoAccent = "purple" | "cyan";

export type ClientLogo = {
  id: string;
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  accent: ClientLogoAccent;
};

export type TrustedBySectionContent = {
  title: string;
};

export const TRUSTED_BY_DESKTOP_MARQUEE_ROWS = 3;

export const TRUSTED_BY_MOBILE_MARQUEE_ROWS = 2;

export const TRUSTED_BY_MARQUEE_DURATION_S = 48;

export const TRUSTED_BY_MARQUEE_MOBILE_BREAKPOINT_PX = 768;

export const TRUSTED_BY_MARQUEE_MIN_GROUP_REPEATS = 4;

export const TRUSTED_BY_MARQUEE_TRACK_COPIES = 2;

export const TRUSTED_BY_MARQUEE_ESTIMATED_ITEM_WIDTH_PX = 214;

export const TRUSTED_BY_MARQUEE_ESTIMATED_ITEM_WIDTH_MOBILE_PX = 138;

export type MarqueeLogoItem = {
  key: string;
  client: ClientLogo;
};

const CLIENT_LOGO_INTRINSIC_WIDTH = 240;
const CLIENT_LOGO_INTRINSIC_HEIGHT = 100;

const CLIENT_LOGOS: Omit<ClientLogo, "accent">[] = [
  { id: "audi", name: "Audi", logoSrc: "/images/clients/audi-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "orange", name: "Orange", logoSrc: "/images/clients/orange-gray-logo.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "tcl", name: "TCL", logoSrc: "/images/clients/tcl-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "krisp", name: "Krisp", logoSrc: "/images/clients/krisp-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "picsart", name: "Picsart", logoSrc: "/images/clients/picsart-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "sofi", name: "SoFi", logoSrc: "/images/clients/soft-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "logos", name: "Logos", logoSrc: "/images/clients/logos-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "big-projects", name: "Big Projects", logoSrc: "/images/clients/big-projects-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "volo", name: "Volo", logoSrc: "/images/clients/volo-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "gazprom", name: "Gazprom", logoSrc: "/images/clients/gazprom-logo-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "uate", name: "UATE", logoSrc: "/images/clients/uate-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "arloopa", name: "Arloopa", logoSrc: "/images/clients/arloopa-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "min-economy", name: "Ministry of Economy", logoSrc: "/images/clients/min-economy-gray-logo.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "ucom", name: "Ucom", logoSrc: "/images/clients/ucom-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "prom-expo", name: "Prom Expo", logoSrc: "/images/clients/prom-expo-logo-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "skill", name: "Skill", logoSrc: "/images/clients/skill-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "toto", name: "Toto", logoSrc: "/images/clients/toto-evolver.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
  { id: "archangel", name: "Archangel", logoSrc: "/images/clients/archangel-gray.png", logoWidth: CLIENT_LOGO_INTRINSIC_WIDTH, logoHeight: CLIENT_LOGO_INTRINSIC_HEIGHT },
];

const TRUSTED_BY_COPY: Record<Locale, TrustedBySectionContent> = {
  en: { title: "Trusted by" },
  hy: { title: "Մեզ վստահում են" },
};

const CLIENT_LOGO_ACCENTS: ClientLogoAccent[] = ["purple", "cyan"];

function withAccent(logos: Omit<ClientLogo, "accent">[]): ClientLogo[] {
  return logos.map((logo, index) => ({
    ...logo,
    accent: CLIENT_LOGO_ACCENTS[index % CLIENT_LOGO_ACCENTS.length] ?? "purple",
  }));
}

export function getTrustedBySectionContent(locale: Locale): TrustedBySectionContent {
  return TRUSTED_BY_COPY[locale];
}

export function getClientLogos(): ClientLogo[] {
  return withAccent(CLIENT_LOGOS);
}

export function getClientLogoMarqueeRows(rowCount: number): ClientLogo[][] {
  const logos = getClientLogos();
  const logosPerMarqueeRow = Math.ceil(logos.length / rowCount);
  const rows: ClientLogo[][] = [];

  for (let index = 0; index < logos.length; index += logosPerMarqueeRow) {
    rows.push(logos.slice(index, index + logosPerMarqueeRow));
  }

  return rows;
}

export function buildMarqueeLogoSequence(clients: ClientLogo[], repeats: number): MarqueeLogoItem[] {
  if (clients.length === 0 || repeats < 1) {
    return [];
  }

  const items: MarqueeLogoItem[] = [];

  for (let repeatIndex = 0; repeatIndex < repeats; repeatIndex += 1) {
    for (const client of clients) {
      items.push({
        key: `${repeatIndex}-${client.id}`,
        client,
      });
    }
  }

  return items;
}

export function resolveMarqueeGroupRepeats(clientCount: number, viewportWidth: number): number {
  const isMobile = viewportWidth <= TRUSTED_BY_MARQUEE_MOBILE_BREAKPOINT_PX;
  const estimatedItemWidth = isMobile
    ? TRUSTED_BY_MARQUEE_ESTIMATED_ITEM_WIDTH_MOBILE_PX
    : TRUSTED_BY_MARQUEE_ESTIMATED_ITEM_WIDTH_PX;
  const segmentWidth = Math.max(clientCount, 1) * estimatedItemWidth;
  const repeatsForViewport = Math.ceil((viewportWidth * 1.12) / segmentWidth);

  return Math.max(TRUSTED_BY_MARQUEE_MIN_GROUP_REPEATS, repeatsForViewport);
}
