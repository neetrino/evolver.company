"use client";

import { createContext, useContext } from "react";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";
import type { NavItem } from "@/lib/i18n";

export type PublicUiLabels = {
  openProject: string;
  viewProject: string;
  projectsHeading: string;
  noProjects: string;
  languageEn: string;
  languageHy: string;
};

type PublicChromeValue = {
  navItems: NavItem[];
  ui: PublicUiLabels;
  brandLogoSrc: string | null;
  projectMedia: PageCopyMediaItem[] | null;
};

const PublicChromeContext = createContext<PublicChromeValue | null>(null);

type PublicChromeProviderProps = {
  value: PublicChromeValue;
  children: React.ReactNode;
};

export function PublicChromeProvider({ value, children }: PublicChromeProviderProps) {
  return <PublicChromeContext.Provider value={value}>{children}</PublicChromeContext.Provider>;
}

export function usePublicChrome(): PublicChromeValue | null {
  return useContext(PublicChromeContext);
}
