import dynamic from "next/dynamic";
import "@/app/services-page.css";
import "@/app/services-detail.css";
import { ServicesSection } from "@/components/public/ServicesSection";
import type { TrustedBySectionContent } from "@/lib/clients-section";
import { resolveClientLogos, resolvePageCopy } from "@/lib/page-copy/resolve";
import type { ServicesDetailContent } from "@/lib/services-detail";
import type { ServicesShowcaseContent } from "@/lib/services-showcase";
import type { Locale } from "@/lib/i18n";

type ServicesPageCopy = ServicesShowcaseContent & { projectsLinkLabel: string };

const ServicesDetailSections = dynamic(() =>
  import("@/components/public/ServicesDetailSections").then((module) => ({
    default: module.ServicesDetailSections,
  })),
);

const TrustedBySection = dynamic(() =>
  import("@/components/public/TrustedBySection").then((module) => ({
    default: module.TrustedBySection,
  })),
);

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const [content, detailContent, trusted, logos] = await Promise.all([
    resolvePageCopy<ServicesPageCopy>("services", locale),
    resolvePageCopy<ServicesDetailContent>("services-detail", locale),
    resolvePageCopy<TrustedBySectionContent>("trusted-by", locale),
    resolveClientLogos(locale),
  ]);

  return (
    <>
      <ServicesSection locale={locale} content={content} />
      <ServicesDetailSections content={detailContent} />
      <TrustedBySection locale={locale} content={trusted} logos={logos} />
    </>
  );
}
