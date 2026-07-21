"use client";

import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { getAdminUi, type AdminUiCopy } from "@/lib/admin-ui-i18n";

export function useAdminUi(): AdminUiCopy {
  const { locale } = useAdminContentLocale();
  return getAdminUi(locale);
}
