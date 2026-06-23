import dynamic from "next/dynamic";
import "@/app/contact-page.css";
import { AboutUsSectionSeam } from "@/components/public/about/AboutUsSectionSeam";
import { ContactUsHero } from "@/components/public/contact/ContactUsHero";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const ContactUsMain = dynamic(() =>
  import("@/components/public/contact/ContactUsMain").then((module) => ({
    default: module.ContactUsMain,
  })),
);

const ContactUsMap = dynamic(() =>
  import("@/components/public/contact/ContactUsMap").then((module) => ({
    default: module.ContactUsMap,
  })),
);

const ContactUsCta = dynamic(() =>
  import("@/components/public/contact/ContactUsCta").then((module) => ({
    default: module.ContactUsCta,
  })),
);

type ContactUsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactUsPage({ params }: ContactUsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getContactContent(locale);

  return (
    <div className="contact-page">
      <div className="contact-page-backdrop" aria-hidden="true">
        <span className="contact-page-aurora contact-page-aurora-purple" />
        <span className="contact-page-aurora contact-page-aurora-cyan" />
        <span className="contact-page-grid" />
        <span className="contact-page-noise" />
      </div>

      <ContactUsHero hero={content.hero} />

      <AboutUsSectionSeam index={0} />

      <ContactUsMain content={content} />

      <AboutUsSectionSeam index={1} />

      <ContactUsMap map={content.map} />

      <AboutUsSectionSeam index={2} />

      <ContactUsCta cta={content.cta} />
    </div>
  );
}
