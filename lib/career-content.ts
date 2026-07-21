import type { Locale } from "@/lib/i18n";

export type CareerPageContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  emptyMessage: string;
  viewRole: string;
  backToCareers: string;
  salaryLabel: string;
  hoursLabel: string;
  apply: {
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
};

const CAREER_PAGE: Record<Locale, CareerPageContent> = {
  en: {
    hero: {
      kicker: "Evolver",
      title: "Careers",
      subtitle: "Join the team building immersive experiences.",
    },
    emptyMessage: "No open positions right now. Check back soon.",
    viewRole: "View role",
    backToCareers: "Back to careers",
    salaryLabel: "Salary",
    hoursLabel: "Hours",
    apply: {
      title: "Apply for this role",
      subtitle: "Tell us a bit about yourself — we will get back to you.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Cover letter / message",
      submit: "Submit application",
      sending: "Sending...",
      success: "Application sent. Thank you!",
      error: "Something went wrong. Please try again.",
    },
  },
  hy: {
    hero: {
      kicker: "Evolver",
      title: "Կարիերա",
      subtitle: "Միացե՛ք թիմին, որը ստեղծում է immersive փորձառություններ։",
    },
    emptyMessage: "Այժմ բաց հաստիքներ չկան։ Շուտով նորից ստուգեք։",
    viewRole: "Դիտել հաստիքը",
    backToCareers: "Վերադառնալ կարիերա",
    salaryLabel: "Աշխատավարձ",
    hoursLabel: "Ժամեր",
    apply: {
      title: "Դիմել այս հաստիքին",
      subtitle: "Պատմե՛ք մեզ ձեր մասին — մենք կպատասխանենք։",
      name: "Անուն",
      email: "Էլ․ փոստ",
      phone: "Հեռախոս",
      message: "Ուղեկցող նամակ / հաղորդագրություն",
      submit: "Ուղարկել դիմումը",
      sending: "Ուղարկվում է...",
      success: "Դիմումը ուղարկված է։ Շնորհակալություն։",
      error: "Ինչ-որ բան սխալ գնաց։ Խնդրում ենք կրկին փորձել։",
    },
  },
};

export function getCareerPageContent(locale: Locale): CareerPageContent {
  return CAREER_PAGE[locale];
}
