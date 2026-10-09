import { notFound } from "next/navigation";
import { PublicChromeProvider, type PublicUiLabels } from "@/components/public/PublicChromeProvider";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { getNavItems, isLocale, type Locale } from "@/lib/i18n";
import { resolvePageCopy } from "@/lib/page-copy/resolve";

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
  const [navLabels, ui] = await Promise.all([
    resolvePageCopy<Record<string, string>>("navigation", locale),
    resolvePageCopy<PublicUiLabels>("interface", locale),
  ]);
  const navItems = getNavItems(locale).map((item) => ({
    ...item,
    label: navLabels[item.key] ?? item.label,
  }));

  return (
    <PublicChromeProvider value={{ navItems, ui }}>
      <div className="public-theme public-layout">
        <PublicHeader locale={locale} />
        <main>{children}</main>
        <PublicFooter locale={locale} />
      </div>
    </PublicChromeProvider>
  );
}
