import { ServicesDetailSections } from "@/components/public/ServicesDetailSections";
import { ServicesSection } from "@/components/public/ServicesSection";
import { TrustedBySection } from "@/components/public/TrustedBySection";
import { getServicesDetailContent } from "@/lib/services-detail";
import { getServicesShowcaseContent } from "@/lib/services-showcase";
import type { Locale } from "@/lib/i18n";

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
