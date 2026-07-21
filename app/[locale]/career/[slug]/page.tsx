import { notFound } from "next/navigation";
import "@/app/blog-page.css";
import "@/app/contact-page.css";
import "@/app/career-page.css";
import { CareerJobDetail } from "@/components/public/career/CareerJobDetail";
import { getCareerPageContent } from "@/lib/career-content";
import { getCareerTranslation, getPublishedCareerJobBySlug } from "@/lib/careers";
import type { Locale } from "@/lib/i18n";

export const revalidate = 60;

type CareerJobPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function CareerJobPage({ params }: CareerJobPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const job = await getPublishedCareerJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const translation = getCareerTranslation(job, locale);

  if (!translation.title) {
    notFound();
  }

  const content = getCareerPageContent(locale);

  return (
    <div className="blog-page">
      <CareerJobDetail locale={locale} job={job} content={content} />
    </div>
  );
}
