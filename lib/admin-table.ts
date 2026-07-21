import type { AdminContentLocale } from "@/lib/admin-locales";
import { getAdminUi } from "@/lib/admin-ui-i18n";

export function getAdminRowTitle(
  translations: Partial<Record<AdminContentLocale, { title: string }>>,
  locale: AdminContentLocale,
): string {
  const direct = translations[locale]?.title?.trim();
  if (direct) {
    return direct;
  }

  return getAdminUi(locale).noTranslation;
}
