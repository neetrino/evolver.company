import { isLocale, type Locale } from "@/lib/i18n/locale";

export {
  DEFAULT_LOCALE,
  isLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n/locale";

type NavKey = "home" | "services" | "projects" | "aboutUs" | "contactUs";

type StaticPageKey = "home" | "services" | "aboutUs" | "contactUs";

type StaticContent = {
  title: string;
  body: string;
};

type NavItem = {
  key: NavKey;
  href: string;
  label: string;
};

const NAV_PATHS: Record<NavKey, string> = {
  home: "",
  services: "/services",
  projects: "/projects",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
};

const NAV_LABELS: Record<Locale, Record<NavKey, string>> = {
  en: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    aboutUs: "About Us",
    contactUs: "Contact Us",
  },
  hy: {
    home: "Գլխավոր",
    services: "Ծառայություններ",
    projects: "Նախագծեր",
    aboutUs: "Մեր մասին",
    contactUs: "Կապ",
  },
};

const STATIC_PAGES: Record<Locale, Record<StaticPageKey, StaticContent>> = {
  en: {
    home: {
      title: "Evolver Showcase",
      body: "Minimal project showcase for testing backend and admin functionality.",
    },
    services: {
      title: "Services",
      body: "We build digital products with a focus on clarity, performance, and maintainability.",
    },
    aboutUs: {
      title: "About Us",
      body: "Evolver is a development studio focused on practical, production-ready solutions.",
    },
    contactUs: {
      title: "Contact Us",
      body: "Reach us at hello@evolver.example for project inquiries.",
    },
  },
  hy: {
    home: {
      title: "Evolver Showcase",
      body: "Նվազագույն նախագծերի ցուցադրում backend-ի և admin-ի ֆունկցionalության թեստավորման համար։",
    },
    services: {
      title: "Ծառայություններ",
      body: "Մենք ստեղծում ենք թվային արտադրանք՝ կենտրոնանալով պարզության, արագության և կայունության վրա։",
    },
    aboutUs: {
      title: "Մեր մասին",
      body: "Evolver-ը զարգացման ստուդիա է, որը կենտրոնանում է գործնական և production-ready լուծումների վրա։",
    },
    contactUs: {
      title: "Կապ",
      body: "Կապվեք մեզ հետ hello@evolver.example հասցեով նախագծային հարցումների համար։",
    },
  },
};

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${normalized}`;
}

export function getNavItems(locale: Locale): NavItem[] {
  return (Object.keys(NAV_PATHS) as NavKey[]).map((key) => ({
    key,
    href: localePath(locale, NAV_PATHS[key]),
    label: NAV_LABELS[locale][key],
  }));
}

export function getStaticPageContent(
  locale: Locale,
  page: StaticPageKey,
): StaticContent {
  return STATIC_PAGES[locale][page];
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const segments = currentPath.split("/").filter(Boolean);

  if (segments.length === 0 || !isLocale(segments[0])) {
    return localePath(targetLocale);
  }

  segments[0] = targetLocale;
  return `/${segments.join("/")}`;
}

export const UI_LABELS: Record<
  Locale,
  {
    openProject: string;
    projectsHeading: string;
    noProjects: string;
    languageEn: string;
    languageHy: string;
  }
> = {
  en: {
    openProject: "Open Project",
    projectsHeading: "Projects",
    noProjects: "No published projects yet.",
    languageEn: "English",
    languageHy: "Armenian",
  },
  hy: {
    openProject: "Բացել նախագիծը",
    projectsHeading: "Նախագծեր",
    noProjects: "Դեռ հրապարակված նախագծեր չկան։",
    languageEn: "Անգլերեն",
    languageHy: "Հայերեն",
  },
};
