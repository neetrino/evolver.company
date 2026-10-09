"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PageCopyActionState } from "@/app/admin/pages/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { useAdminUi } from "@/components/admin/useAdminUi";
import type { AdminUiCopy } from "@/lib/admin-ui-i18n";
import type { AdminContentLocale } from "@/lib/admin-locales";
import type { PageCopyDraft, PageCopyLocale } from "@/lib/page-copy/constants";
import type { PageCopyField } from "@/lib/page-copy/fields";
import type { PageCopyEditorModel } from "@/lib/page-copy/model-types";

export type PageCopyState = {
  model: PageCopyEditorModel;
  ui: AdminUiCopy;
  adminLocale: AdminContentLocale;
  activeLocale: PageCopyLocale;
  setActiveLocale: (locale: PageCopyLocale) => void;
  query: string;
  setQuery: (query: string) => void;
  editedOnly: boolean;
  setEditedOnly: (value: boolean) => void;
  draft: PageCopyDraft;
  setDraft: (draft: PageCopyDraft) => void;
  status: PageCopyActionState;
  setStatus: (status: PageCopyActionState) => void;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  isResetting: boolean;
  setIsResetting: (value: boolean) => void;
  refresh: () => void;
};

function draftFromFields(fields: PageCopyField[]): PageCopyDraft {
  return {
    en: Object.fromEntries(fields.map((field) => [field.path, field.values.en])),
    hy: Object.fromEntries(fields.map((field) => [field.path, field.values.hy])),
  };
}

export function usePageCopyState(model: PageCopyEditorModel): PageCopyState {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale: adminLocale } = useAdminContentLocale();
  const [activeLocale, setActiveLocale] = useState<PageCopyLocale>(adminLocale === "hy" ? "hy" : "en");
  const [query, setQuery] = useState("");
  const [editedOnly, setEditedOnly] = useState(false);
  const [draft, setDraft] = useState<PageCopyDraft>(() => draftFromFields(model.fields));
  const [status, setStatus] = useState<PageCopyActionState>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  return {
    model,
    ui,
    adminLocale,
    activeLocale,
    setActiveLocale,
    query,
    setQuery,
    editedOnly,
    setEditedOnly,
    draft,
    setDraft,
    status,
    setStatus,
    isSaving,
    setIsSaving,
    isResetting,
    setIsResetting,
    refresh: () => router.refresh(),
  };
}
