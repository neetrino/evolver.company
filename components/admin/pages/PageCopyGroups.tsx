"use client";

import { useMemo } from "react";
import { PageCopyFieldRow } from "@/components/admin/pages/PageCopyFieldRow";
import type { PageCopyState } from "@/components/admin/pages/usePageCopyState";
import { groupPageCopyFields } from "@/lib/page-copy/groups";

type PageCopyGroupsProps = {
  state: PageCopyState;
  onChange: (path: string, value: string) => void;
};

export function PageCopyGroups({ state, onChange }: PageCopyGroupsProps) {
  const { model, draft, query, editedOnly, activeLocale, ui } = state;
  const groups = useMemo(
    () =>
      groupPageCopyFields(model.fields, {
        query,
        draft,
        editedOnly,
        isEdited: (field) =>
          draft.en[field.path] !== field.defaults.en || draft.hy[field.path] !== field.defaults.hy,
      }),
    [draft, editedOnly, model.fields, query],
  );

  if (groups.length === 0) {
    return <p className="admin-table-empty">{ui.pagesEmpty}</p>;
  }

  return groups.map((group, index) => (
    <details
      key={`${group.name}-${query}`}
      className="page-copy-group"
      open={query.length > 0 || index === 0}
    >
      <summary>
        {group.name}
        <span>{group.fields.length}</span>
      </summary>
      <div className="page-copy-fields">
        {group.fields.map((field) => (
          <PageCopyFieldRow
            key={field.path}
            field={field}
            locale={activeLocale}
            value={draft[activeLocale][field.path] ?? ""}
            editedLabel={ui.pagesEdited}
            onChange={(value) => onChange(field.path, value)}
          />
        ))}
      </div>
    </details>
  ));
}
