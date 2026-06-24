import type { Locale } from "./i18n";
import { getProjectVisual } from "./project-visuals";
import type { ProjectTranslationRecord, ProjectWithDetails } from "./project-types";

export const PROJECT_CATALOG_ORDER = ["estatedata", "vexpo", "vrealty", "vcity"] as const;

export type ProjectCatalogSlug = (typeof PROJECT_CATALOG_ORDER)[number];

type CatalogTranslation = {
  title: string;
  shortDescription: string;
  longDescription: string;
};

export type ProjectCatalogEntry = {
  slug: ProjectCatalogSlug;
  projectUrl: string;
  translations: Record<Locale, CatalogTranslation>;
};

const CATALOG_ENTRIES: ProjectCatalogEntry[] = [
  {
    slug: "estatedata",
    projectUrl: "https://estatedata.am/",
    translations: {
      en: {
        title: "Estate Data",
        shortDescription:
          "Cloud Service for Property Owners. Estate data is a cloud-based platform that will radically simplify the process of managing, modifying and repairing your property.",
        longDescription:
          "ESTATE DATA involves creating a 3D virtual model of the property and enhancing it with furniture, decor, and other design elements. Our goal is to provide an immersive and engaging experience that showcases the true potential of the property, while also allowing buyers to visualize their own design preferences and make informed decisions.",
      },
      hy: {
        title: "Estate Data",
        shortDescription:
          "Ամպային ծառայություն գույքի սեփականատերերի համար։ Estate data-ն ամպային հարթակ է, որը կարմամբ պարզեցնում է գույքի կառավարման, փոփոխման և վերանորոգման գործընթացը։",
        longDescription:
          "ESTATE DATA-ն ներառում է գույքի 3D վիրտուալ մոդելի ստեղծում և դրա հարստացում կահույքով, դեկորով և այլ դիզայնային տարրերով։ Մեր նպատակն է ապահովել լիարժեք և հետաքրքիր փորձառություն, որը ցուցադրում է գույքի ամբողջ պոտենցիալը և թույլ է տալիս գնորդներին պատկերացնել իրենց դիզայնային նախընտրությունները։",
      },
    },
  },
  {
    slug: "vexpo",
    projectUrl: "https://evolver.company/",
    translations: {
      en: {
        title: "vExpo",
        shortDescription:
          "Visualization of Expos & Events. VEXPO specializes in creating 3D tour models of exhibitions, allowing virtual visitors to explore and experience exhibitions from anywhere.",
        longDescription:
          "vExpo transforms physical exhibitions into immersive virtual experiences. Explore expo halls, interact with booths, and discover products from anywhere — without missing a single showcase moment.",
      },
      hy: {
        title: "vExpo",
        shortDescription:
          "Ցուցահանդեսների և միջոցառումների վիզուալացում։ VEXPO-ն ստեղծում է ցուցահանդեսների 3D tour մոդելներ, որոնք թույլ են տալիս վիրտուալ այցելուներին ուսումնասիրել ցուցահանդեսները ցանկացած վայրից։",
        longDescription:
          "vExpo-ն ֆիզիկական ցուցահանդեսները վերածում է լիարժեք վիրտուալ փորձառության։ Ուսումնասիրեք expo դահլիճները, փոխազդեք stand-երի հետ և բացահայտեք արտադրանքները ցանկացած վայրից։",
      },
    },
  },
  {
    slug: "vrealty",
    projectUrl: "https://vrealty.am/",
    translations: {
      en: {
        title: "vRealty.am",
        shortDescription:
          "Visualization of Real Estate. VREALTY specializes in creating 3D tour models of realty, providing a unique way for potential buyers or renters to explore properties remotely.",
        longDescription:
          "No time for commuting? Choose the house from your house. vRealty delivers photorealistic 3D property tours with virtual staging, floor plans, and rich media — all in one platform.",
      },
      hy: {
        title: "vRealty.am",
        shortDescription:
          "Անշարժ գույքի վիզուալացում։ VREALTY-ն ստեղծում է անշարժ գույքի 3D tour մոդելներ, որոնք գնորդներին և վարձակալներին թույլ են տալիս հեռակա ուսումնասիրել գույքերը։",
        longDescription:
          "Ժամանակ չկա՞ ճանապարհորդելու։ Ընտրեք տունը ձեր տնից։ vRealty-ն առաջարկում է ֆոտորեալիստիկ 3D property tour-եր, virtual staging, հատակագծեր և հարուստ մեդիա՝ մեկ հարթակում։",
      },
    },
  },
  {
    slug: "vcity",
    projectUrl: "https://vcity.guide/",
    translations: {
      en: {
        title: "vCity",
        shortDescription:
          "Virtual City Directory. vCity is a platform that presents the top places in Armenia with 3D visualization and immersive walkthroughs.",
        longDescription:
          "vCity is a platform that presents the top places in Armenia with 3D visualization. Walk through streets, discover venues, and explore the city virtually before you visit.",
      },
      hy: {
        title: "vCity",
        shortDescription:
          "Վիրտուալ քաղաքային ուղեցույց։ vCity-ն հարթակ է, որը ներկայացնում է Հայաստանի լավագույն վայրերը 3D վիզուալացմամբ և լիարժեք walkthrough-ներով։",
        longDescription:
          "vCity-ն հարթակ է, որը ներկայացնում է Հայաստանի լավագույն վայրերը 3D վիզուալացմամբ։ Քայլեք փողոցներով, բացահայտեք վայրերը և ուսումնասիրեք քաղաքը վիրտուալ կերպով։",
      },
    },
  },
];

const CATALOG_BY_SLUG = new Map<string, ProjectCatalogEntry>(
  CATALOG_ENTRIES.map((entry) => [entry.slug, entry]),
);

const CATALOG_REFERENCE_DATE = new Date("2024-01-01T00:00:00.000Z");

function toTranslationRecords(entry: ProjectCatalogEntry): ProjectTranslationRecord[] {
  return (Object.entries(entry.translations) as Array<[Locale, CatalogTranslation]>).map(
    ([locale, copy]) => ({
      locale,
      title: copy.title,
      shortDescription: copy.shortDescription,
      longDescription: copy.longDescription,
    }),
  );
}

/** Static portfolio project shaped like a published DB row. */
export function catalogEntryToProjectWithDetails(entry: ProjectCatalogEntry): ProjectWithDetails {
  const visual = getProjectVisual(entry.slug);

  return {
    id: `catalog-${entry.slug}`,
    slug: entry.slug,
    catalogSlug: null,
    projectUrl: entry.projectUrl,
    coverImage: visual.background || visual.illustration || null,
    coverImageKey: null,
    accentColor: null,
    isPublished: true,
    createdAt: CATALOG_REFERENCE_DATE,
    updatedAt: CATALOG_REFERENCE_DATE,
    translations: toTranslationRecords(entry),
    images: [],
  };
}

/** All catalog projects in display order. */
export function getCatalogProjects(): ProjectWithDetails[] {
  return CATALOG_ENTRIES.map(catalogEntryToProjectWithDetails);
}

/** Lookup a catalog project by slug. */
export function getCatalogProjectBySlug(slug: string): ProjectWithDetails | null {
  const entry = CATALOG_BY_SLUG.get(slug);
  return entry ? catalogEntryToProjectWithDetails(entry) : null;
}

/** Raw catalog entries for database seeding. */
export function getProjectCatalogEntries(): ProjectCatalogEntry[] {
  return [...CATALOG_ENTRIES];
}

export function isCatalogSlug(slug: string): slug is ProjectCatalogSlug {
  return CATALOG_BY_SLUG.has(slug);
}

function dbProjectHasContent(project: ProjectWithDetails): boolean {
  return project.translations.some((translation) => translation.title.trim().length > 0);
}

function getCatalogClaimSlug(project: ProjectWithDetails): string | null {
  if (project.catalogSlug) {
    return project.catalogSlug;
  }

  if (isCatalogSlug(project.slug)) {
    return project.slug;
  }

  return null;
}

function findDbProjectClaimingCatalogSlot(
  catalogSlot: ProjectCatalogSlug,
  catalogSlugDbProjects: ProjectWithDetails[],
): ProjectWithDetails | undefined {
  return catalogSlugDbProjects.find((project) => getCatalogClaimSlug(project) === catalogSlot);
}

/**
 * Prefer published DB rows; fall back to the static catalog only when no DB row claims the slot.
 * When a catalog slot is claimed in DB as draft, it is omitted (DB status wins over fallback).
 */
export function mergePortfolioProjects(
  publishedDbProjects: ProjectWithDetails[],
  catalogSlugDbProjects?: ProjectWithDetails[],
): ProjectWithDetails[] {
  const catalogDbProjects = catalogSlugDbProjects ?? publishedDbProjects;

  const orderedCatalog = PROJECT_CATALOG_ORDER.map((catalogSlot) => {
    const claimedDbProject = findDbProjectClaimingCatalogSlot(catalogSlot, catalogDbProjects);

    if (claimedDbProject && !claimedDbProject.isPublished) {
      return null;
    }

    if (
      claimedDbProject?.isPublished &&
      dbProjectHasContent(claimedDbProject)
    ) {
      return claimedDbProject;
    }

    if (!claimedDbProject) {
      return catalogEntryToProjectWithDetails(CATALOG_BY_SLUG.get(catalogSlot)!);
    }

    return catalogEntryToProjectWithDetails(CATALOG_BY_SLUG.get(catalogSlot)!);
  }).filter((project): project is ProjectWithDetails => project !== null);

  const returnedIds = new Set(orderedCatalog.map((project) => project.id));
  const extraProjects = publishedDbProjects.filter(
    (project) =>
      !returnedIds.has(project.id) &&
      project.isPublished &&
      dbProjectHasContent(project),
  );

  return [...orderedCatalog, ...extraProjects];
}
