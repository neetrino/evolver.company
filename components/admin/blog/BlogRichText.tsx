"use client";

import { useRef } from "react";
import { BlogLocaleField } from "@/components/admin/blog/BlogLocaleField";
import type { BlogLocaleCode, LocaleTextMap } from "@/lib/blog/translatable";

type BlogRichTextProps = {
  name: string;
  values: LocaleTextMap;
  activeLocale: BlogLocaleCode;
  onChange: (locale: BlogLocaleCode, value: string) => void;
};

const TOOLS = [
  { label: "B", tag: "strong" },
  { label: "I", tag: "em" },
  { label: "H2", tag: "h2" },
  { label: "H3", tag: "h3" },
] as const;

export function BlogRichText({ name, values, activeLocale, onChange }: BlogRichTextProps) {
  const activeRef = useRef<HTMLTextAreaElement>(null);

  function wrapSelection(tag: string): void {
    const field = activeRef.current;
    const current = values[activeLocale] ?? "";
    if (!field) {
      onChange(activeLocale, `<${tag}></${tag}>`);
      return;
    }

    const start = field.selectionStart;
    const end = field.selectionEnd;
    const selected = current.slice(start, end);
    const next = `${current.slice(0, start)}<${tag}>${selected}</${tag}>${current.slice(end)}`;
    onChange(activeLocale, next);
  }

  return (
    <div className="admin-rich-text">
      <div className="admin-rich-text-tools">
        {TOOLS.map((tool) => (
          <button key={tool.tag} type="button" className="btn btn-admin-secondary" onClick={() => wrapSelection(tool.tag)}>
            {tool.label}
          </button>
        ))}
      </div>
      <BlogLocaleField
        name={name}
        label="Description"
        values={values}
        activeLocale={activeLocale}
        onChange={onChange}
        multiline
        rows={8}
        activeInputRef={activeRef}
      />
    </div>
  );
}
