import { AboutUsSectionSeam } from "@/components/public/about/AboutUsSectionSeam";
import { ContactUsCta } from "@/components/public/contact/ContactUsCta";
import { ContactUsHero } from "@/components/public/contact/ContactUsHero";
import { ContactUsMain } from "@/components/public/contact/ContactUsMain";
import { ContactUsMap } from "@/components/public/contact/ContactUsMap";
import { getContactContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

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
