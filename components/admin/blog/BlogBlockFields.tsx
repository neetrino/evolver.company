"use client";

import { BlogGalleryField } from "@/components/admin/blog/BlogGalleryField";
import { BlogLocaleField } from "@/components/admin/blog/BlogLocaleField";
import { BlogRichText } from "@/components/admin/blog/BlogRichText";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import type { BlogContentBlock } from "@/lib/blog/blocks";
import type { BlogLocaleCode } from "@/lib/blog/translatable";

type BlogBlockFieldsProps = {
  block: BlogContentBlock;
  activeLocale: BlogLocaleCode;
  postId?: string;
  onChange: (block: BlogContentBlock) => void;
};

export function BlogBlockFields({ block, activeLocale, postId, onChange }: BlogBlockFieldsProps) {
  if (block.type === "heading") {
    return (
      <BlogLocaleField
        name={`heading-${block.id}`}
        label="Heading"
        values={block.text}
        activeLocale={activeLocale}
        rows={1}
        multiline
        onChange={(locale, value) => onChange({ ...block, text: { ...block.text, [locale]: value } })}
      />
    );
  }

  if (block.type === "description") {
    return (
      <BlogRichText
        name={`description-${block.id}`}
        values={block.html}
        activeLocale={activeLocale}
        onChange={(locale, value) => onChange({ ...block, html: { ...block.html, [locale]: value } })}
      />
    );
  }

  if (block.type === "photo") {
    return (
      <>
        <CoverImageUploader
          label="Photo"
          uploadContext="blog"
          projectId={postId}
          value={block.url ? { url: block.url, key: block.key ?? "" } : null}
          onChange={(image) => onChange({ ...block, url: image?.url ?? "", key: image?.key })}
        />
        <BlogLocaleField
          name={`caption-${block.id}`}
          label="Caption"
          values={block.caption}
          activeLocale={activeLocale}
          onChange={(locale, value) => onChange({ ...block, caption: { ...block.caption, [locale]: value } })}
        />
      </>
    );
  }

  if (block.type === "youtube" || block.type === "link") {
    return (
      <>
        <div className="admin-form-field">
          <label htmlFor={`${block.type}-${block.id}-url`}>URL</label>
          <input
            id={`${block.type}-${block.id}-url`}
            value={block.url}
            onChange={(event) => onChange({ ...block, url: event.target.value })}
          />
        </div>
        {block.type === "link" ? (
          <BlogLocaleField
            name={`label-${block.id}`}
            label="Label"
            values={block.label}
            activeLocale={activeLocale}
            onChange={(locale, value) => onChange({ ...block, label: { ...block.label, [locale]: value } })}
          />
        ) : null}
      </>
    );
  }

  return <BlogGalleryField items={block.items} postId={postId} onChange={(items) => onChange({ ...block, items })} />;
}
