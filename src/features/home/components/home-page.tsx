import { AboutSection } from '@/features/home/components/about-section';
import { CtaSection } from '@/features/home/components/cta-section';
import { FeaturedProjectsSection } from '@/features/home/components/featured-projects-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { SiteFooter } from '@/features/home/components/site-footer';
import { SolutionsSection } from '@/features/home/components/solutions-section';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <CtaSection />
      <SiteFooter />
    </>
  );
}
