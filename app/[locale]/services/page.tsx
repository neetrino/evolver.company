import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/public/SectionHeader";
import { ServiceCard } from "@/components/public/ServiceCard";
import { getServicesContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getServicesContent(locale);

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
          <div className="card-grid">
            {content.items.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
