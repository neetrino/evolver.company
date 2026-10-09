"use client";

import { useMemo, useState } from "react";
import { PageCopyFieldRow } from "@/components/admin/pages/PageCopyFieldRow";
import type { PageCopyState } from "@/components/admin/pages/usePageCopyState";
import { groupPageCopyFields, isFieldEdited, type PageCopyGroup } from "@/lib/page-copy/groups";
import type { PageCopyDraft } from "@/lib/page-copy/constants";

type PageCopyGroupsProps = {
  state: PageCopyState;
  onChange: (path: string, value: string) => void;
};

function groupHasEdits(group: PageCopyGroup, draft: PageCopyDraft): boolean {
  return group.fields.some((field) => isFieldEdited(field, draft));
}

function PageCopyGroupTabs({
  groups,
  draft,
  activeName,
  editedLabel,
  onSelect,
}: {
  groups: PageCopyGroup[];
  draft: PageCopyDraft;
  activeName: string;
  editedLabel: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="admin-tabs page-copy-tabs" role="tablist">
      {groups.map((group) => {
        const isActive = group.name === activeName;
        const className = isActive ? "admin-tab admin-tab-active" : "admin-tab";

        return (
          <button
            key={group.name}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={className}
            onClick={() => onSelect(group.name)}
          >
            {group.name}
            <span className="page-copy-tab-count">{group.fields.length}</span>
            {groupHasEdits(group, draft) ? <span className="page-copy-tab-dot" aria-label={editedLabel} /> : null}
          </button>
        );
      })}
    </div>
  );
}

export function PageCopyGroups({ state, onChange }: PageCopyGroupsProps) {
  const { model, draft, query, editedOnly, activeLocale, ui } = state;
  const [selected, setSelected] = useState<string | null>(null);
  const groups = useMemo(
    () =>
      groupPageCopyFields(model.fields, {
        query,
        draft,
        editedOnly,
        isEdited: (field) => isFieldEdited(field, draft),
      }),
    [draft, editedOnly, model.fields, query],
  );
  const active = groups.find((group) => group.name === selected) ?? groups[0];

  if (!active) {
    return <p className="admin-table-empty">{ui.pagesEmpty}</p>;
  }

  return (
    <>
      <PageCopyGroupTabs
        groups={groups}
        draft={draft}
        activeName={active.name}
        editedLabel={ui.pagesEdited}
        onSelect={setSelected}
      />
      <div className="page-copy-panel" role="tabpanel">
        <div className="page-copy-fields">
          {active.fields.map((field) => (
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
      </div>
    </>
  );
}
