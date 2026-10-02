"use client";

import {
  ADMIN_CONTENT_LOCALE_LABELS,
  ADMIN_CONTENT_LOCALES,
  type AdminContentLocale,
} from "@/lib/admin-locales";

type ProjectLanguageTabsProps = {
  activeTab: AdminContentLocale;
  onTabChange: (locale: AdminContentLocale) => void;
  completeLocales?: readonly AdminContentLocale[];
  errorLocales?: readonly AdminContentLocale[];
};

export function ProjectLanguageTabs({
  activeTab,
  onTabChange,
  completeLocales = [],
  errorLocales = [],
}: ProjectLanguageTabsProps) {
  return (
    <div className="admin-lang-toggle" role="tablist" aria-label="Content language">
      {ADMIN_CONTENT_LOCALES.map((locale) => {
        const isActive = activeTab === locale;
        const isComplete = completeLocales.includes(locale);
        const hasError = errorLocales.includes(locale);
        const className = [
          "admin-lang-toggle-btn",
          isActive ? "admin-lang-toggle-btn-active" : "",
          isComplete ? "admin-lang-toggle-btn-complete" : "",
          hasError ? "admin-lang-toggle-btn-error" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={className}
            onClick={() => onTabChange(locale)}
          >
            {ADMIN_CONTENT_LOCALE_LABELS[locale]}
          </button>
        );
      })}
    </div>
  );
}
