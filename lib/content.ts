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

type AboutContent = {
  hero: PageHero;
  body: string;
  values: ValueItem[];
};

type ContactContent = {
  hero: PageHero;
  form: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  info: {
    emailLabel: string;
    email: string;
    locationLabel: string;
    location: string;
  };
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

const PROJECTS_PAGE: Record<Locale, PageHero> = {
  en: {
    eyebrow: "Portfolio",
    title: "Projects",
    subtitle: "A curated selection of immersive digital products, platforms, and virtual experiences.",
  },
  hy: {
    eyebrow: "Պորտֆոլիո",
    title: "Նախագծեր",
    subtitle: "Լիարժեք թվային պրոդուկտների, հարթակների և վիրտուալ փորձառությունների ընտրանի։",
  },
};

const ABOUT: Record<Locale, AboutContent> = {
  en: {
    hero: {
      title: "About Us",
      subtitle: "We build digital products with structure, clarity and practical thinking.",
    },
    body: "We are a digital team focused on building websites, platforms and tools that help businesses work better online. Our approach is simple: understand the goal, design the structure, develop the product and keep improving it.",
    values: [
      {
        title: "Clarity",
        description: "Every product needs a clear structure before development starts.",
      },
      {
        title: "Functionality",
        description: "Design must support real business goals, not just look good.",
      },
      {
        title: "Reliability",
        description: "We build solutions that can grow, be maintained and improved.",
      },
    ],
  },
  hy: {
    hero: {
      title: "Մեր մասին",
      subtitle: "Մենք ստեղծում ենք թվային պրոդուկտներ՝ հստակ կառուցվածքով, պարզությամբ և գործնական մտածելակերպով։",
    },
    body: "Մենք թվային թիմ ենք, որը ստեղծում է կայքեր, հարթակներ և գործիքներ՝ բիզնեսներին առցանց ավելի արդյունավետ աշխատելու համար։ Մեր մոտեցումը պարզ է՝ հասկանալ նպատակը, նախագծել կառուցվածքը, մշակել լուծումը և շարունակաբար բարելավել այն։",
    values: [
      {
        title: "Հստակություն",
        description: "Յուրաքանչյուր պրոդուկտ պետք է ունենա հստակ կառուցվածք մինչև մշակման սկիզբը։",
      },
      {
        title: "Ֆունկցիոնալություն",
        description: "Դիզայնը պետք է օգնի իրական բիզնես նպատակներին, ոչ միայն գեղեցիկ տեսք ունենա։",
      },
      {
        title: "Վստահելիություն",
        description: "Մենք ստեղծում ենք լուծումներ, որոնք կարող են աճել, սպասարկվել և բարելավվել։",
      },
    ],
  },
};

const CONTACT: Record<Locale, ContactContent> = {
  en: {
    hero: {
      title: "Contact Us",
      subtitle: "Tell us about your project and we will get back to you.",
    },
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send Message",
      success: "Thank you. Your message has been sent.",
      error: "Something went wrong. Please try again.",
    },
    info: {
      emailLabel: "Email",
      email: "hello@example.com",
      locationLabel: "Location",
      location: "Yerevan, Armenia",
    },
  },
  hy: {
    hero: {
      title: "Կապ մեզ հետ",
      subtitle: "Պատմեք ձեր նախագծի մասին, և մենք կկապվենք ձեզ հետ։",
    },
    form: {
      name: "Անուն",
      email: "Էլ․ փոստ",
      phone: "Հեռախոս",
      message: "Հաղորդագրություն",
      submit: "Ուղարկել",
      success: "Շնորհակալություն։ Ձեր հաղորդագրությունը ուղարկված է։",
      error: "Սխալ է տեղի ունեցել։ Խնդրում ենք փորձել կրկին։",
    },
    info: {
      emailLabel: "Էլ․ փոստ",
      email: "hello@example.com",
      locationLabel: "Գտնվելու վայր",
      location: "Երևան, Հայաստան",
    },
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return HOME[locale];
}

export function getServicesContent(locale: Locale) {
  return SERVICES[locale];
}

export function getProjectsPageContent(locale: Locale): PageHero {
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
