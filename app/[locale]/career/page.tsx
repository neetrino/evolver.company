import "@/app/blog-page.css";
import "@/app/career-page.css";
import { CareerHero } from "@/components/public/career/CareerHero";
import { CareerJobGrid } from "@/components/public/career/CareerJobGrid";
import { getCareerPageContent } from "@/lib/career-content";
import { getPublishedCareerJobs } from "@/lib/careers";
import type { Locale } from "@/lib/i18n";

export const revalidate = 60;

type CareerPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const content = getCareerPageContent(locale);
  const jobs = await getPublishedCareerJobs();

  return (
    <div className="blog-page">
      <div className="blog-page-backdrop" aria-hidden="true">
        <span className="blog-page-aurora blog-page-aurora-purple" />
        <span className="blog-page-aurora blog-page-aurora-cyan" />
        <span className="blog-page-grid" />
      </div>

      <CareerHero hero={content.hero} />
      <CareerJobGrid locale={locale} jobs={jobs} content={content} />
    </div>
  );
}
