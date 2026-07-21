"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import {
  isAdminContentLocale,
  type AdminContentLocale,
} from "@/lib/admin-locales";

const STORAGE_KEY = "evolver-admin-content-locale";
const DEFAULT_LOCALE: AdminContentLocale = "en";

type AdminContentLocaleContextValue = {
  locale: AdminContentLocale;
  setLocale: (locale: AdminContentLocale) => void;
};

const AdminContentLocaleContext = createContext<AdminContentLocaleContextValue | null>(
  null,
);

const localeListeners = new Set<() => void>();

function emitLocaleChange(): void {
  localeListeners.forEach((listener) => listener());
}

function subscribeLocale(listener: () => void): () => void {
  localeListeners.add(listener);
  return () => {
    localeListeners.delete(listener);
  };
}

function getLocaleSnapshot(): AdminContentLocale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isAdminContentLocale(stored)) {
    return stored;
  }
  return DEFAULT_LOCALE;
}

function getLocaleServerSnapshot(): AdminContentLocale {
  return DEFAULT_LOCALE;
}

type AdminContentLocaleProviderProps = {
  children: React.ReactNode;
};

export function AdminContentLocaleProvider({ children }: AdminContentLocaleProviderProps) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );

  const setLocale = useCallback((next: AdminContentLocale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    emitLocaleChange();
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <AdminContentLocaleContext.Provider value={value}>
      {children}
    </AdminContentLocaleContext.Provider>
  );
}

export function useAdminContentLocale(): AdminContentLocaleContextValue {
  const context = useContext(AdminContentLocaleContext);
  if (!context) {
    throw new Error("useAdminContentLocale must be used within AdminContentLocaleProvider");
  }
  return context;
}
