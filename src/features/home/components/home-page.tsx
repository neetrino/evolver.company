import { AboutSection } from '@/features/home/components/about-section';
import { CtaSection } from '@/features/home/components/cta-section';
import { FeaturedProjectsSection } from '@/features/home/components/featured-projects-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { SiteFooter } from '@/features/home/components/site-footer';
import { WhatWeDoSection } from '@/features/home/components/what-we-do-section';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <CtaSection />
      <SiteFooter />
    </>
  );
}
