"use client";

import {
  ADMIN_CONTENT_LOCALE_LABELS,
  ADMIN_CONTENT_LOCALES,
  type AdminContentLocale,
} from "@/lib/admin-locales";

type ProjectLanguageTabsProps = {
  activeTab: AdminContentLocale;
  onTabChange: (locale: AdminContentLocale) => void;
};

export function ProjectLanguageTabs({ activeTab, onTabChange }: ProjectLanguageTabsProps) {
  return (
    <div className="admin-lang-toggle" role="tablist" aria-label="Content language">
      {ADMIN_CONTENT_LOCALES.map((locale) => {
        const isActive = activeTab === locale;

        return (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`admin-lang-toggle-btn ${isActive ? "admin-lang-toggle-btn-active" : ""}`}
            onClick={() => onTabChange(locale)}
          >
            {ADMIN_CONTENT_LOCALE_LABELS[locale]}
          </button>
        );
      })}
    </div>
  );
}
