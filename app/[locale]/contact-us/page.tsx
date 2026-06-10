import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/public/ContactForm";
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
    <>
      <section className="page-hero">
        <Container>
          <h1 className="page-hero-title">{content.hero.title}</h1>
          <p className="page-hero-subtitle">{content.hero.subtitle}</p>
        </Container>
      </section>

      <section className="section-sm">
        <Container>
          <div className="contact-layout">
            <ContactForm labels={content.form} />

            <aside className="contact-info-card">
              <div className="contact-info-item">
                <span className="contact-info-label">{content.info.emailLabel}</span>
                <span className="contact-info-value">{content.info.email}</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">{content.info.locationLabel}</span>
                <span className="contact-info-value">{content.info.location}</span>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
