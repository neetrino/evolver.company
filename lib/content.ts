import type { Locale } from "@/lib/i18n";

export type ServiceItem = {
  title: string;
  description: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type HeroHeadlineLine = {
  text: string;
  gradient?: boolean;
};

export type HeroFeature = {
  key: "scanning" | "twins" | "immersive";
  label: string;
};

type HomeContent = {
  hero: {
    eyebrow: string;
    headline: HeroHeadlineLine[];
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    features: HeroFeature[];
  };
  servicesPreview: ServiceItem[];
  about: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredTitleLines: HeroHeadlineLine[];
  featuredSubtitle: string;
  viewAllProjects: string;
};

type PageHero = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export type AboutUsCapability = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type AboutContent = {
  hero: {
    title: string;
  };
  searchLabel: string;
  capabilitiesEyebrow: string;
  capabilitiesHeadline: string;
  capabilities: AboutUsCapability[];
};

export type ContactContent = {
  hero: {
    title: string;
    subtitle: string;
    kicker: string;
  };
  form: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  info: {
    title: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    locationLabel: string;
    locationLines: string[];
    hoursLabel: string;
    hours: string;
  };
  map: {
    title: string;
    subtitle: string;
    directions: string;
    openInMaps: string;
  };
  cta: ProjectsPageCtaContent;
};

const HOME: Record<Locale, HomeContent> = {
  en: {
    hero: {
      eyebrow: "3D Scanning & Digital Innovation",
      headline: [
        { text: "We create" },
        { text: "The next", gradient: true },
        { text: "Generation of", gradient: true },
        { text: "Marketing" },
        { text: "Content" },
      ],
      title: "We create the next generation of marketing content",
      subtitle:
        "Evolver specializes in 3D scanning and digitizing a wide range of physical spaces, bringing your imagination to life.",
      primaryCta: "Explore Projects",
      secondaryCta: "Contact Us",
      features: [
        { key: "scanning", label: "3D Scanning" },
        { key: "twins", label: "Digital Twins" },
        { key: "immersive", label: "Immersive Content" },
      ],
    },
    servicesPreview: [
      { title: "Web Development", description: "Fast, structured websites built for growth." },
      { title: "UI/UX Design", description: "Clear interfaces that support real goals." },
      { title: "Digital Platforms", description: "Scalable tools for modern businesses." },
    ],
    about:
      "We help businesses turn ideas into functional digital products with clean design, scalable architecture and practical execution.",
    featuredEyebrow: "Selected work",
    featuredTitle: "Featured projects",
    featuredTitleLines: [
      { text: "Featured" },
      { text: "projects", gradient: true },
    ],
    featuredSubtitle: "Immersive digital experiences built with cutting-edge 3D technology.",
    viewAllProjects: "View all projects",
  },
  hy: {
    hero: {
      eyebrow: "3D սկանավորում և թվային նորարարություն",
      headline: [
        { text: "Մենք" },
        { text: "ստեղծում ենք" },
        { text: "Հաջորդ", gradient: true },
        { text: "Սերունդի", gradient: true },
        { text: "Մարքեթինգային" },
        { text: "Բովանդակություն" },
      ],
      title: "Մենք ստեղծում ենք հաջորդ սերունդի մարքեթինգային բովանդակություն",
      subtitle:
        "Evolver-ը մասնագիտանում է 3D սկանավորումով և ֆիզիկական տարածությունների թվայնացմամբ՝ ձեր երևակայությունը կյանքի կոչելու համար։",
      primaryCta: "Դիտել նախագծերը",
      secondaryCta: "Կապ մեզ հետ",
      features: [
        { key: "scanning", label: "3D Սկանավորում" },
        { key: "twins", label: "Թվային երկվորյակներ" },
        { key: "immersive", label: "Լիարժեք բովանդակություն" },
      ],
    },
    servicesPreview: [
      { title: "Վեբ մշակում", description: "Արագ և կառուցված կայքեր աճի համար։" },
      { title: "UI/UX դիզայն", description: "Հստակ ինտերֆեյսներ իրական նպատակների համար։" },
      { title: "Թվային հարթակներ", description: "Մասշտաբավորվող գործիքներ ժամանակակից բիզնեսի համար։" },
    ],
    about:
      "Մենք օգնում ենք բիզնեսներին գաղափարները վերածել աշխատող թվային լուծումների՝ մաքուր դիզայնով, մասշտաբավորվող կառուցվածքով և գործնական իրականացմամբ։",
    featuredEyebrow: "Ընտրված աշխատանք",
    featuredTitle: "Ընտրված նախագծեր",
    featuredTitleLines: [
      { text: "Ընտրված" },
      { text: "նախագծեր", gradient: true },
    ],
    featuredSubtitle: "Լիարժեք թվային փորձառություններ՝ ստեղծված նորագույն 3D տեխնոլոգիաներով։",
    viewAllProjects: "Դիտել բոլոր նախագծերը",
  },
};

const SERVICES: Record<Locale, { hero: PageHero; items: ServiceItem[] }> = {
  en: {
    hero: {
      title: "Services",
      subtitle: "Focused digital services for companies that need practical and reliable solutions.",
    },
    items: [
      {
        title: "Website Development",
        description:
          "Custom websites, landing pages and business websites with clean structure and fast performance.",
      },
      {
        title: "Web Platforms",
        description:
          "Dashboards, internal systems and online platforms built around real business processes.",
      },
      {
        title: "UI/UX Design",
        description:
          "Simple, usable and visually consistent interfaces for websites and digital products.",
      },
      {
        title: "Admin Panels",
        description:
          "Clean management systems for content, projects, users and business operations.",
      },
      {
        title: "API Integrations",
        description:
          "Integrations with external services, CRMs, payment systems and business tools.",
      },
      {
        title: "Technical Support",
        description: "Maintenance, fixes, improvements and long-term technical care.",
      },
    ],
  },
  hy: {
    hero: {
      title: "Ծառայություններ",
      subtitle: "Թվային ծառայություններ ընկերությունների համար, որոնք ունեն գործնական և վստահելի լուծումների կարիք։",
    },
    items: [
      {
        title: "Կայքերի մշակում",
        description:
          "Custom կայքեր, landing page-եր և բիզնես կայքեր՝ մաքուր կառուցվածքով և արագ աշխատանքով։",
      },
      {
        title: "Վեբ հարթակներ",
        description: "Dashboard-ներ, ներքին համակարգեր և առցանց հարթակներ՝ բիզնես գործընթացների համար։",
      },
      {
        title: "UI/UX դիզայն",
        description:
          "Պարզ, հարմար և տեսողականորեն ամբողջական ինտերֆեյսներ կայքերի և թվային պրոդուկտների համար։",
      },
      {
        title: "Ադմին համակարգեր",
        description:
          "Մաքուր կառավարման համակարգեր բովանդակության, նախագծերի, օգտատերերի և գործընթացների համար։",
      },
      {
        title: "API ինտեգրացիաներ",
        description:
          "Ինտեգրացիաներ արտաքին ծառայությունների, CRM-ների, վճարային համակարգերի և բիզնես գործիքների հետ։",
      },
      {
        title: "Տեխնիկական աջակցություն",
        description: "Սպասարկում, ուղղումներ, բարելավումներ և երկարաժամկետ տեխնիկական աջակցություն։",
      },
    ],
  },
};

export type ProjectsPageCtaContent = {
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

export type ProjectsPageContent = PageHero &
  ProjectsPageCtaContent & {
  searchLabel: string;
};

const PROJECTS_PAGE: Record<Locale, ProjectsPageContent> = {
  en: {
    eyebrow: "Portfolio",
    title: "Projects",
    subtitle: "A curated selection of immersive digital products, platforms, and virtual experiences.",
    searchLabel: "Contact us",
    ctaEyebrow: "Become a customer",
    ctaTitle: "Want to be featured in our projects?",
    ctaBody:
      "Contact us to have your business, venue or event be represented in one of our projects. Our devoted team will get back to you shortly.",
    ctaLabel: "Drop us a line",
  },
  hy: {
    eyebrow: "Պորտֆոլիո",
    title: "Նախագծեր",
    subtitle: "Լիարժեք թվային պրոդուկտների, հարթակների և վիրտուալ փորձառությունների ընտրանի։",
    searchLabel: "Կապ",
    ctaEyebrow: "Դարձեք հաճախորդ",
    ctaTitle: "Ցանկանո՞ւմ եք ներկայացվել մեր նախագծերում",
    ctaBody:
      "Կապվեք մեզ հետ՝ ձեր բիզնեսը, վայրը կամ միջոցառումը մեր նախագծերից մեկում ներկայացնելու համար։ Մեր թիմը շուտով կկապվի ձեզ հետ։",
    ctaLabel: "Գրեք մեզ",
  },
};

const ABOUT: Record<Locale, AboutContent> = {
  en: {
    hero: {
      title: "About Us",
    },
    searchLabel: "Contact us",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesHeadline: "Evolver 3D scans and digitizes every place that comes to your mind",
    capabilities: [
      {
        id: "estatedata",
        title: "Cloud Services for Property Owners",
        description: "Experience Your Future Home Today with Our Virtual 3D Tours.",
        href: "https://estatedata.am/",
      },
      {
        id: "vexpo",
        title: "Visualisation of Events",
        description: "Missed an Expo? No worries. Explore with vExpo.",
        href: "https://evolver.company/",
      },
      {
        id: "vcity",
        title: "Virtual City Directory",
        description: "Walk in your favorite city virtually.",
        href: "https://vcity.guide/",
      },
      {
        id: "vrealty",
        title: "Virtual Real Estate Directory",
        description: "Your dream homes are just one click away!",
        href: "https://vrealty.am/",
      },
    ],
  },
  hy: {
    hero: {
      title: "Մեր մասին",
    },
    searchLabel: "Կապ",
    capabilitiesEyebrow: "Հնարավորություններ",
    capabilitiesHeadline: "Evolver-ը 3D սկանավորում և թվայնացում է ցանկացած տեղ, որ մտքում ունեք",
    capabilities: [
      {
        id: "estatedata",
        title: "Ամպային ծառայություններ գույքի սեփականատերերի համար",
        description: "Զգացեք ձեր ապագա տունը այսօր՝ մեր վիրտուալ 3D տուրերով։",
        href: "https://estatedata.am/",
      },
      {
        id: "vexpo",
        title: "Միջոցառումների վիզուալացում",
        description: "Բաց թողե՞լ եք ցուցահանդեսը։ vExpo-ով ուսումնասիրեք այն ցանկացած ժամանակ։",
        href: "https://evolver.company/",
      },
      {
        id: "vcity",
        title: "Վիրտուալ քաղաքային ուղեցույց",
        description: "Քայլեք ձեր սիրելի քաղաքում վիրտուալորեն։",
        href: "https://vcity.guide/",
      },
      {
        id: "vrealty",
        title: "Վիրտուալ անշարժ գույքի ուղեցույց",
        description: "Ձեր երազանի տները ընդամենը մեկ կտտոցով հեռու են!",
        href: "https://vrealty.am/",
      },
    ],
  },
};

const CONTACT: Record<Locale, ContactContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Contact Us",
      subtitle: "Tell us about your project and we will get back to you shortly.",
    },
    form: {
      title: "Send a message",
      subtitle: "Share your idea — our team responds within one business day.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send Message",
      sending: "Sending…",
      success: "Thank you. Your message has been sent.",
      error: "Something went wrong. Please try again.",
    },
    info: {
      title: "Reach us directly",
      emailLabel: "Email",
      email: "info@evolver.am",
      phoneLabel: "Phone",
      phone: "+374 91 62 80 07",
      locationLabel: "Office",
      locationLines: ["Adonts 4/3, Penthouse", "0014 Yerevan", "Armenia"],
      hoursLabel: "Hours",
      hours: "Monday – Friday, 10:30 – 18:30",
    },
    map: {
      title: "Find us in Yerevan",
      subtitle: "Visit our penthouse studio on Adonts Street.",
      directions: "Get directions",
      openInMaps: "Open in Google Maps",
    },
    cta: {
      ctaEyebrow: "Become a customer",
      ctaTitle: "Want to be featured in our projects?",
      ctaBody:
        "Contact us to have your business, venue or event be represented in one of our projects. Our devoted team will get back to you shortly.",
      ctaLabel: "Drop us a line",
    },
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Կապ մեզ հետ",
      subtitle: "Պատմեք ձեր նախագծի մասին, և մենք կկապվենք ձեզ հետ հնարավորինս շուտ։",
    },
    form: {
      title: "Ուղարկել հաղորդագրություն",
      subtitle: "Կիսվեք ձեր գաղափարով — մեր թիմը կպատասխանի մեկ աշխատանքային օրվա ընթացքում։",
      name: "Անուն",
      email: "Էլ․ փոստ",
      phone: "Հեռախոս",
      message: "Հաղորդագրություն",
      submit: "Ուղարկել",
      sending: "Ուղարկվում է…",
      success: "Շնորհակալություն։ Ձեր հաղորդագրությունը ուղարկված է։",
      error: "Սխալ է տեղի ունեցել։ Խնդրում ենք փորձել կրկին։",
    },
    info: {
      title: "Կապնվել մեզ հետ",
      emailLabel: "Էլ․ փոստ",
      email: "info@evolver.am",
      phoneLabel: "Հեռախոս",
      phone: "+374 91 62 80 07",
      locationLabel: "Գրասենյակ",
      locationLines: ["Ադոնց 4/3, Պենթհաուս", "0014 Երևան", "Հայաստան"],
      hoursLabel: "Աշխատանքային ժամեր",
      hours: "Երկուշաբթի – Ուրբաթ, 10:30 – 18:30",
    },
    map: {
      title: "Գտեք մեզ Երևանում",
      subtitle: "Այցելեք մեր ստուդիա-պենթհաուսը Ադոնց փողոցում։",
      directions: "Ուղղություններ",
      openInMaps: "Բացել Google Maps-ում",
    },
    cta: {
      ctaEyebrow: "Դարձեք հաճախորդ",
      ctaTitle: "Ցանկանո՞ւմ եք ներկայացվել մեր նախագծերում",
      ctaBody:
        "Կապվեք մեզ հետ՝ ձեր բիզնեսը, վայրը կամ միջոցառումը մեր նախագծերից մեկում ներկայացնելու համար։ Մեր թիմը շուտով կկապվի ձեզ հետ։",
      ctaLabel: "Գրեք մեզ",
    },
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return HOME[locale];
}

export function getServicesContent(locale: Locale) {
  return SERVICES[locale];
}

export function getProjectsPageContent(locale: Locale): ProjectsPageContent {
  return PROJECTS_PAGE[locale];
}

export function getAboutContent(locale: Locale): AboutContent {
  return ABOUT[locale];
}

export function getContactContent(locale: Locale): ContactContent {
  return CONTACT[locale];
}

export type FooterSocialKey = "facebook" | "instagram" | "linkedin";

export type FooterContent = {
  brandDescription: string;
  locationTitle: string;
  locationLines: string[];
  workInquiriesTitle: string;
  workInquiriesText: string;
  phoneTitle: string;
  phone: string;
  usefulLinksTitle: string;
  copyright: string;
  rightsReserved: string;
  scrollToTop: string;
  social: Array<{ key: FooterSocialKey; href: string; label: string }>;
};

const FOOTER: Record<Locale, FooterContent> = {
  en: {
    brandDescription:
      "We create immersive 3D digital and interactive content that connects brands with people.",
    locationTitle: "USA",
    locationLines: [
      "A19709, 651 N Broad St.",
      "Suite 201 S,",
      "Middletown, Delaware",
      "USA",
    ],
    workInquiriesTitle: "Work inquiries",
    workInquiriesText: "Interested in working with us?",
    phoneTitle: "Phone",
    phone: "+374 91 62 80 07",
    usefulLinksTitle: "Useful Links",
    copyright: "Evolver LLC.",
    rightsReserved: "All rights reserved.",
    scrollToTop: "Scroll to top",
    social: [
      { key: "facebook", href: "https://facebook.com", label: "Facebook" },
      { key: "instagram", href: "https://instagram.com", label: "Instagram" },
      { key: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    ],
  },
  hy: {
    brandDescription:
      "Մենք ստեղծում ենք լիարժեք 3D թվային և ինտերակտիվ բովանդակություն, որը կապում է բրենդները մարդկանց հետ։",
    locationTitle: "ԱՄՆ",
    locationLines: [
      "A19709, 651 N Broad St.",
      "Suite 201 S,",
      "Middletown, Delaware",
      "USA",
    ],
    workInquiriesTitle: "Աշխատանքային հարցումներ",
    workInquiriesText: "Ցանկանու՞մ եք մեզ հետ աշխատել։",
    phoneTitle: "Հեռախոս",
    phone: "+374 91 62 80 07",
    usefulLinksTitle: "Օգտակար հղումներ",
    copyright: "Evolver LLC.",
    rightsReserved: "Բոլոր իրավունքները պաշտպանված են։",
    scrollToTop: "Վերև",
    social: [
      { key: "facebook", href: "https://facebook.com", label: "Facebook" },
      { key: "instagram", href: "https://instagram.com", label: "Instagram" },
      { key: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    ],
  },
};

export function getFooterContent(locale: Locale): FooterContent {
  return FOOTER[locale];
}
