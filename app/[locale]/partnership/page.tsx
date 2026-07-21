import dynamic from "next/dynamic";
import "@/app/partnership-page.css";
import { AboutUsSectionSeam } from "@/components/public/about/AboutUsSectionSeam";
import { PartnershipHero } from "@/components/public/partnership/PartnershipHero";
import { getPartnershipContent } from "@/lib/partnership";
import type { Locale } from "@/lib/i18n";

const PartnershipPartners = dynamic(() =>
  import("@/components/public/partnership/PartnershipPartners").then((module) => ({
    default: module.PartnershipPartners,
  })),
);

const PartnershipCta = dynamic(() =>
  import("@/components/public/partnership/PartnershipCta").then((module) => ({
    default: module.PartnershipCta,
  })),
);

type PartnershipPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PartnershipPage({ params }: PartnershipPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getPartnershipContent(locale);

  return (
    <div className="partnership-page">
      <div className="partnership-page-backdrop" aria-hidden="true">
        <span className="partnership-page-aurora partnership-page-aurora-purple" />
        <span className="partnership-page-aurora partnership-page-aurora-cyan" />
        <span className="partnership-page-grid" />
        <span className="partnership-page-noise" />
      </div>

      <PartnershipHero hero={content.hero} />

      <AboutUsSectionSeam index={0} />

      <PartnershipPartners content={content.partners} />

      <AboutUsSectionSeam index={1} />

      <PartnershipCta locale={locale} cta={content.cta} />
    </div>
  );
}
