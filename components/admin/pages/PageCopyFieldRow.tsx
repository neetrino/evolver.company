"use client";

import type { PageCopyLocale } from "@/lib/page-copy/constants";
import type { PageCopyField } from "@/lib/page-copy/fields";

type PageCopyFieldRowProps = {
  field: PageCopyField;
  locale: PageCopyLocale;
  value: string;
  editedLabel: string;
  onChange: (value: string) => void;
};

export function PageCopyFieldRow({
  field,
  locale,
  value,
  editedLabel,
  onChange,
}: PageCopyFieldRowProps) {
  const inputId = `${locale}-${field.path}`;
  const edited = value !== field.defaults[locale];

  return (
    <div className="admin-form-field">
      <label htmlFor={inputId}>
        <span>{field.label}</span>
        {edited ? <span className="page-copy-edited">{editedLabel}</span> : null}
      </label>
      {field.multiline ? (
        <textarea
          id={inputId}
          value={value}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input id={inputId} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}
