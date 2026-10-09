"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PageCopyActionState } from "@/app/admin/pages/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { useAdminUi } from "@/components/admin/useAdminUi";
import type { AdminUiCopy } from "@/lib/admin-ui-i18n";
import type { AdminContentLocale } from "@/lib/admin-locales";
import type { PageCopyDraft, PageCopyLocale } from "@/lib/page-copy/constants";
import { draftFromFields } from "@/lib/page-copy/fields";
import type { PageCopyEditorModel, PageCopyMediaItem } from "@/lib/page-copy/model-types";

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
  media: PageCopyMediaItem[];
  setMedia: (media: PageCopyMediaItem[]) => void;
  status: PageCopyActionState;
  setStatus: (status: PageCopyActionState) => void;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  isResetting: boolean;
  setIsResetting: (value: boolean) => void;
  refresh: () => void;
  goBack: () => void;
};

export function usePageCopyState(model: PageCopyEditorModel): PageCopyState {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale: adminLocale } = useAdminContentLocale();
  const [activeLocale, setActiveLocale] = useState<PageCopyLocale>(adminLocale);
  const [query, setQuery] = useState("");
  const [editedOnly, setEditedOnly] = useState(false);
  const [draft, setDraft] = useState(() => draftFromFields(model.fields, (field, locale) => field.values[locale]));
  const [media, setMedia] = useState(model.media);
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
    media,
    setMedia,
    status,
    setStatus,
    isSaving,
    setIsSaving,
    isResetting,
    setIsResetting,
    refresh: () => router.refresh(),
    goBack: () => {
      if (window.history.length > 1) {
        router.back();
        return;
      }

      router.push("/admin/pages");
    },
  };
}
