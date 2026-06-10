import type { Locale } from "@/lib/i18n";

export type ServiceItem = {
  title: string;
  description: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

type HomeContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  servicesPreview: ServiceItem[];
  about: string;
  featuredTitle: string;
  featuredSubtitle: string;
};

type PageHero = {
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
      title: "Digital products built with clarity.",
      subtitle:
        "We design and develop websites, platforms and digital tools for businesses that need reliable technology and clean user experience.",
      primaryCta: "View Projects",
      secondaryCta: "Contact Us",
    },
    servicesPreview: [
      { title: "Web Development", description: "Fast, structured websites built for growth." },
      { title: "UI/UX Design", description: "Clear interfaces that support real goals." },
      { title: "Digital Platforms", description: "Scalable tools for modern businesses." },
    ],
    about:
      "We help businesses turn ideas into functional digital products with clean design, scalable architecture and practical execution.",
    featuredTitle: "Featured projects",
    featuredSubtitle: "Recent work from our studio.",
  },
  hy: {
    hero: {
      title: "Թվային լուծումներ՝ հստակ մտածված կառուցվածքով։",
      subtitle:
        "Մենք նախագծում և մշակում ենք կայքեր, հարթակներ և թվային գործիքներ բիզնեսների համար, որոնց պետք է վստահելի տեխնոլոգիա և պարզ օգտագործման փորձ։",
      primaryCta: "Դիտել նախագծերը",
      secondaryCta: "Կապ մեզ հետ",
    },
    servicesPreview: [
      { title: "Վեբ մշակում", description: "Արագ և կառուցված կայքեր աճի համար։" },
      { title: "UI/UX դիզայն", description: "Հստակ ինտերֆեյսներ իրական նպատակների համար։" },
      { title: "Թվային հարթակներ", description: "Մասշտաբավորվող գործիքներ ժամանակակից բիզնեսի համար։" },
    ],
    about:
      "Մենք օգնում ենք բիզնեսներին գաղափարները վերածել աշխատող թվային լուծումների՝ մաքուր դիզայնով, մասշտաբավորվող կառուցվածքով և գործնական իրականացմամբ։",
    featuredTitle: "Ընտրված նախագծեր",
    featuredSubtitle: "Մեր ստուդիայի վերջին աշխատանքները։",
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
    title: "Projects",
    subtitle: "A selection of digital products, websites and platforms.",
  },
  hy: {
    title: "Նախագծեր",
    subtitle: "Թվային պրոդուկտների, կայքերի և հարթակների ընտրանի։",
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
