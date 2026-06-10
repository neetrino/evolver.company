import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/public/SectionHeader";
import { ServiceCard } from "@/components/public/ServiceCard";
import { getAboutContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type AboutUsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getAboutContent(locale);

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
          <p className="about-block">{content.body}</p>
        </Container>
      </section>

      <section className="section-sm">
        <Container>
          <SectionHeader title={locale === "en" ? "Our values" : "Մեր արժեքները"} />
          <div className="card-grid-3">
            {content.values.map((value) => (
              <article key={value.title} className="value-card">
                <h3 className="value-card-title">{value.title}</h3>
                <p className="value-card-text">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
