import dynamic from "next/dynamic";
import "@/app/customers-page.css";
import { AboutUsSectionSeam } from "@/components/public/about/AboutUsSectionSeam";
import { CustomersHero } from "@/components/public/customers/CustomersHero";
import {
  getAllCustomers,
  getCustomersContent,
  getFeaturedCustomers,
} from "@/lib/customers";
import type { Locale } from "@/lib/i18n";

const CustomersSpotlight = dynamic(() =>
  import("@/components/public/customers/CustomersSpotlight").then((module) => ({
    default: module.CustomersSpotlight,
  })),
);

const CustomersGallery = dynamic(() =>
  import("@/components/public/customers/CustomersGallery").then((module) => ({
    default: module.CustomersGallery,
  })),
);

const CustomersCta = dynamic(() =>
  import("@/components/public/customers/CustomersCta").then((module) => ({
    default: module.CustomersCta,
  })),
);

type CustomersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomersPage({ params }: CustomersPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getCustomersContent(locale);
  const featured = getFeaturedCustomers(locale);
  const clients = getAllCustomers();

  return (
    <div className="customers-page">
      <div className="customers-page-backdrop" aria-hidden="true">
        <span className="customers-page-aurora customers-page-aurora-purple" />
        <span className="customers-page-aurora customers-page-aurora-cyan" />
        <span className="customers-page-grid" />
        <span className="customers-page-noise" />
      </div>

      <CustomersHero hero={content.hero} />

      <AboutUsSectionSeam index={0} />

      <CustomersSpotlight content={content.spotlight} items={featured} />

      <AboutUsSectionSeam index={1} />

      <CustomersGallery locale={locale} content={content.gallery} clients={clients} />

      <AboutUsSectionSeam index={2} />

      <CustomersCta locale={locale} cta={content.cta} />
    </div>
  );
}
