import { notFound } from "next/navigation";
import { PublicChromeProvider, type PublicUiLabels } from "@/components/public/PublicChromeProvider";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { getNavItems, isLocale, type Locale } from "@/lib/i18n";
import { BRAND_LOGO } from "@/lib/brand";
import { resolveMediaSrc, resolvePageCopy } from "@/lib/page-copy/resolve";
import { readPageMedia } from "@/lib/page-copy/media-store";

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
  const [navLabels, ui, brandLogoSrc, projectMedia] = await Promise.all([
    resolvePageCopy<Record<string, string>>("navigation", locale),
    resolvePageCopy<PublicUiLabels>("interface", locale),
    resolveMediaSrc("footer", "brand-logo", BRAND_LOGO.src),
    readPageMedia("projects"),
  ]);
  const navItems = getNavItems(locale).map((item) => ({
    ...item,
    label: navLabels[item.key] ?? item.label,
  }));

  return (
    <PublicChromeProvider value={{ navItems, ui, brandLogoSrc, projectMedia }}>
      <div className="public-theme public-layout">
        <PublicHeader locale={locale} />
        <main>{children}</main>
        <PublicFooter locale={locale} />
      </div>
    </PublicChromeProvider>
  );
}
