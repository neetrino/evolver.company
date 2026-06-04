"use client";

import type { Locale } from "@/lib/i18n";

type ProjectLanguageTabsProps = {
  activeTab: Locale;
  onTabChange: (locale: Locale) => void;
};

export function ProjectLanguageTabs({ activeTab, onTabChange }: ProjectLanguageTabsProps) {
  const tabs: { locale: Locale; label: string }[] = [
    { locale: "hy", label: "Armenian" },
    { locale: "en", label: "English" },
  ];

  return (
    <div className="admin-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.locale}
          type="button"
          className={`admin-tab ${activeTab === tab.locale ? "admin-tab-active" : ""}`}
          onClick={() => onTabChange(tab.locale)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
