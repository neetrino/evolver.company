import type { Locale } from "@/lib/i18n";

export type AboutUsTeamMember = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutUsTeamRow = {
  id: string;
  members: AboutUsTeamMember[];
};

export type AboutUsTeamContent = {
  eyebrow: string;
  headline: string;
  rows: AboutUsTeamRow[];
};

const TEAM_ROW_IDS = ["leadership", "technology", "scanning"] as const;

type TeamMemberDefinition = {
  id: string;
  imageSrc: string;
  copy: Record<Locale, { name: string; role: string }>;
};

const TEAM_MEMBER_DEFINITIONS: TeamMemberDefinition[][] = [
  [
    {
      id: "vladimir-sofyan",
      imageSrc: "/images/team/vladimir-sofyan.png",
      copy: {
        en: { name: "Vladimir Sofyan", role: "CEO, Co-founder" },
        hy: { name: "Vladimir Sofyan", role: "CEO, համահիմնադիր" },
      },
    },
    {
      id: "arpine-sargsyan",
      imageSrc: "/images/team/arpi.png",
      copy: {
        en: { name: "Arpine Sargsyan", role: "CMO, Co-founder" },
        hy: { name: "Arpine Sargsyan", role: "CMO, համահիմնադիր" },
      },
    },
    {
      id: "raya-bakanyan",
      imageSrc: "/images/team/raya-bakanyan.png",
      copy: {
        en: { name: "Raya Bakanyan", role: "Managing Director, Co-founder" },
        hy: { name: "Raya Bakanyan", role: "Գործադիր տնօրեն, համահիմնադիր" },
      },
    },
  ],
  [
    {
      id: "hayk-messia",
      imageSrc: "/images/team/hayk-messia.png",
      copy: {
        en: { name: "Hayk Messia", role: "IT Manager, Integrations, Analytics" },
        hy: { name: "Hayk Messia", role: "IT մենեջեր, ինտեգրացիաներ, անալիտիկա" },
      },
    },
    {
      id: "liana-ipekchyan",
      imageSrc: "/images/team/liana-ipekchyan.png",
      copy: {
        en: { name: "Liana Ipekchyan", role: "Operations Manager" },
        hy: { name: "Liana Ipekchyan", role: "Գործառնությունների մենեջեր" },
      },
    },
    {
      id: "inna-sargsyan",
      imageSrc: "/images/team/inna-sargsyan.png",
      copy: {
        en: { name: "Inna Sargsyan", role: "Project Manager" },
        hy: { name: "Inna Sargsyan", role: "Նախագծերի մենեջեր" },
      },
    },
  ],
  [
    {
      id: "spartak-garnikyan",
      imageSrc: "/images/team/spartak-garnikyan.png",
      copy: {
        en: { name: "Spartak Garnikyan", role: "Scanning expert, team lead" },
        hy: { name: "Spartak Garnikyan", role: "Սկանավորման մասնագետ, թիմի ղեկավար" },
      },
    },
    {
      id: "hayk-datumyan",
      imageSrc: "/images/team/hayk-datumyan.png",
      copy: {
        en: { name: "Hayk Datumyan", role: "Scanning expert, drone specialist" },
        hy: { name: "Hayk Datumyan", role: "Սկանավորման մասնագետ, drone specialist" },
      },
    },
    {
      id: "andranik-asatryan",
      imageSrc: "/images/team/andranik.png",
      copy: {
        en: { name: "Andranik Asatryan", role: "Visual Art Director" },
        hy: { name: "Andranik Asatryan", role: "Վիզուալ արվեստի ղեկավար" },
      },
    },
  ],
];

const TEAM_COPY: Record<Locale, Pick<AboutUsTeamContent, "eyebrow" | "headline">> = {
  en: {
    eyebrow: "Meet our dedicated team",
    headline: "Our team.",
  },
  hy: {
    eyebrow: "Հանդիպեք մեր նվիրված թիմին",
    headline: "Մեր թիմը.",
  },
};

function mapTeamMembers(locale: Locale, definitions: TeamMemberDefinition[]): AboutUsTeamMember[] {
  return definitions.map((member) => {
    const copy = member.copy[locale];

    return {
      id: member.id,
      name: copy.name,
      role: copy.role,
      imageSrc: member.imageSrc,
      imageAlt: copy.name,
    };
  });
}

/** About page team grid copy and photo assets. */
export function getAboutUsTeamContent(locale: Locale): AboutUsTeamContent {
  const copy = TEAM_COPY[locale];

  return {
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    rows: TEAM_ROW_IDS.map((id, index) => ({
      id,
      members: mapTeamMembers(locale, TEAM_MEMBER_DEFINITIONS[index]),
    })),
  };
}
