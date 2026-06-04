import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/public/CTASection";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { ProjectCard } from "@/components/public/ProjectCard";
import { SectionHeader } from "@/components/public/SectionHeader";
import { ServiceCard } from "@/components/public/ServiceCard";
import { getHomeContent } from "@/lib/content";
import { getHomeHeroSlidesForStorefront } from "@/lib/home-hero";
import { localePath, type Locale } from "@/lib/i18n";
import { getFeaturedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getHomeContent(locale);
  const heroSlides = await getHomeHeroSlidesForStorefront(locale);
  const featuredProjects = await getFeaturedProjects(3);

  return (
    <>
      <HeroCarousel slides={heroSlides} locale={locale} />

      <section className="section-sm">
        <Container>
          <SectionHeader title={locale === "en" ? "What we do" : "Ինչ ենք անում"} />
          <div className="card-grid-3">
            {content.servicesPreview.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            title={content.featuredTitle}
            subtitle={content.featuredSubtitle}
          />
          {featuredProjects.length > 0 ? (
            <div className="card-grid">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="about-block">{locale === "en" ? "Projects coming soon." : "Նախագծերը շուտով։"}</p>
          )}
        </Container>
      </section>

      <section className="section-sm">
        <Container>
          <SectionHeader title={locale === "en" ? "About Evolver" : "Evolver-ի մասին"} />
          <p className="about-block">{content.about}</p>
        </Container>
      </section>

      <CTASection
        title={locale === "en" ? "Ready to start?" : "Պատրա՞ստ եք սկսել"}
        text={
          locale === "en"
            ? "Tell us about your product and we will help you shape the next step."
            : "Պատմեք ձեր պրոդուկտի մասին, և մենք կօգնենք ձևավորել հաջորդ քայլը։"
        }
        buttonHref={localePath(locale, "/contact-us")}
        buttonLabel={content.hero.secondaryCta}
      />
    </>
  );
}
