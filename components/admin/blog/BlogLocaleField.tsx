"use client";

import { BLOG_LOCALES, type BlogLocaleCode, type LocaleTextMap } from "@/lib/blog/translatable";

type BlogLocaleFieldProps = {
  name: string;
  label: string;
  values: LocaleTextMap;
  activeLocale: BlogLocaleCode;
  onChange: (locale: BlogLocaleCode, value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  error?: string;
  activeInputRef?: React.Ref<HTMLTextAreaElement>;
};

export function BlogLocaleField({
  name,
  label,
  values,
  activeLocale,
  onChange,
  multiline = false,
  rows = 4,
  hint,
  error,
  activeInputRef,
}: BlogLocaleFieldProps) {
  return (
    <div className="admin-form-field">
      <label htmlFor={`${name}.${activeLocale}`}>{label}</label>
      {BLOG_LOCALES.map((locale) => (
        <LocaleControl
          key={locale}
          name={name}
          locale={locale}
          hidden={locale !== activeLocale}
          value={values[locale] ?? ""}
          multiline={multiline}
          rows={rows}
          onChange={onChange}
          activeInputRef={locale === activeLocale ? activeInputRef : undefined}
        />
      ))}
      {hint ? <p className="admin-field-hint">{hint}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}

type LocaleControlProps = {
  name: string;
  locale: BlogLocaleCode;
  hidden: boolean;
  value: string;
  multiline: boolean;
  rows: number;
  onChange: (locale: BlogLocaleCode, value: string) => void;
  activeInputRef?: React.Ref<HTMLTextAreaElement>;
};

function LocaleControl({
  name,
  locale,
  hidden,
  value,
  multiline,
  rows,
  onChange,
  activeInputRef,
}: LocaleControlProps) {
  const fieldName = `${name}.${locale}`;
  const className = hidden ? "hidden" : undefined;

  if (multiline) {
    return (
      <textarea
        id={fieldName}
        name={fieldName}
        className={className}
        rows={rows}
        ref={activeInputRef}
        value={value}
        onChange={(event) => onChange(locale, event.target.value)}
      />
    );
  }

  return (
    <input
      id={fieldName}
      name={fieldName}
      className={className}
      value={value}
      onChange={(event) => onChange(locale, event.target.value)}
    />
  );
}
