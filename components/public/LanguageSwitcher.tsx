"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePublicChrome } from "@/components/public/PublicChromeProvider";
import type { Locale } from "@/lib/i18n";
import { LOCALES, switchLocalePath, UI_LABELS } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const chrome = usePublicChrome();
  const labels = chrome?.ui ?? UI_LABELS[locale];

  return (
    <div className="lang-switch" role="group" aria-label="Language switcher">
      {LOCALES.map((targetLocale) => {
        const isActive = targetLocale === locale;
        const href = switchLocalePath(pathname, targetLocale);
        const label = targetLocale.toUpperCase();

        return (
          <Link
            key={targetLocale}
            href={href}
            prefetch
            className={`lang-switch-link ${isActive ? "lang-switch-link-active" : ""}`}
            aria-current={isActive ? "true" : undefined}
            title={
              targetLocale === "en" ? labels.languageEn : labels.languageHy
            }
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
