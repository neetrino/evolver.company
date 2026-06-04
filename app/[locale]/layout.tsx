import { notFound } from "next/navigation";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { isLocale, type Locale } from "@/lib/i18n";

type PublicLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hy" }];
}

export default async function LocaleLayout({ children, params }: PublicLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;

  return (
    <div className="public-theme">
      <PublicHeader locale={locale} />
      <main>{children}</main>
      <PublicFooter locale={locale} />
    </div>
  );
}
