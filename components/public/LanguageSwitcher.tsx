"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { LOCALES, switchLocalePath, UI_LABELS } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

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
            className={`lang-switch-link ${isActive ? "lang-switch-link-active" : ""}`}
            aria-current={isActive ? "true" : undefined}
            title={
              targetLocale === "en" ? UI_LABELS[locale].languageEn : UI_LABELS[locale].languageHy
            }
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
