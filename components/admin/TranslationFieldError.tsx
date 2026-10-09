import { ADMIN_CONTENT_LOCALES, type AdminContentLocale } from "@/lib/admin-locales";

type TranslationFieldErrorProps = {
  fieldErrors?: Record<string, string>;
  locale: string;
  field: string;
};

export function TranslationFieldError({ fieldErrors, locale, field }: TranslationFieldErrorProps) {
  const message = fieldErrors?.[`translations.${locale}.${field}`];
  if (!message) {
    return null;
  }

  return <p className="form-error">{message}</p>;
}

export function translationErrorLocales(
  fieldErrors: Record<string, string> | undefined,
): AdminContentLocale[] {
  return ADMIN_CONTENT_LOCALES.filter((locale) =>
    Object.keys(fieldErrors ?? {}).some((key) => key.startsWith(`translations.${locale}.`)),
  );
}
