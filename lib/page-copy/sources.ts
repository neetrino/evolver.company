import { getClientLogos } from "@/lib/clients-section";
import { getHomeContent } from "@/lib/content";
import { getAllCustomers, getCustomerIndustry, getCustomersContent } from "@/lib/customers";
import { getNavItems, type Locale } from "@/lib/i18n";
import { getServicesShowcaseContent } from "@/lib/services-showcase";

const HOME_EMPTY_PROJECTS = {
  en: "Projects coming soon.",
  hy: "Նախագծերը շուտով։",
} as const;

const SERVICES_PROJECTS_LINK = {
  en: "Browse projects",
  hy: "Դիտել նախագծերը",
} as const;

export function loadHomeCopy(locale: Locale) {
  return {
    ...getHomeContent(locale),
    emptyProjects: HOME_EMPTY_PROJECTS[locale],
  };
}

export function loadServicesCopy(locale: Locale) {
  return {
    ...getServicesShowcaseContent(locale),
    projectsLinkLabel: SERVICES_PROJECTS_LINK[locale],
  };
}

export function loadCustomersCopy(locale: Locale) {
  const industries = Object.fromEntries(
    getAllCustomers().map((client) => [client.id, getCustomerIndustry(client.id, locale)]),
  );

  return { ...getCustomersContent(locale), industries };
}

export function loadClientNames(): Record<string, string> {
  return Object.fromEntries(getClientLogos().map((client) => [client.id, client.name]));
}

export function loadNavigationCopy(locale: Locale): Record<string, string> {
  return Object.fromEntries(getNavItems(locale).map((item) => [item.key, item.label]));
}
