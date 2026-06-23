import dynamic from "next/dynamic";
import "@/app/services-page.css";
import "@/app/services-detail.css";
import { ServicesSection } from "@/components/public/ServicesSection";
import { getServicesDetailContent } from "@/lib/services-detail";
import { getServicesShowcaseContent } from "@/lib/services-showcase";
import type { Locale } from "@/lib/i18n";

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
  const content = getServicesShowcaseContent(locale);
  const detailContent = getServicesDetailContent(locale);

  return (
    <>
      <ServicesSection locale={locale} content={content} />
      <ServicesDetailSections content={detailContent} />
      <TrustedBySection locale={locale} />
    </>
  );
}
