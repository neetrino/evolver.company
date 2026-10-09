"use client";

import { useEffect } from "react";
import { resetPageCopyAction, savePageCopyAction } from "@/app/admin/pages/actions";
import { PageCopyGroups } from "@/components/admin/pages/PageCopyGroups";
import { PageCopyMedia } from "@/components/admin/pages/PageCopyMedia";
import { usePageCopyState, type PageCopyState } from "@/components/admin/pages/usePageCopyState";
import { ProjectLanguageTabs } from "@/components/admin/ProjectLanguageTabs";
import { draftFromFields } from "@/lib/page-copy/fields";
import { isDraftDirty, localesWithEdits } from "@/lib/page-copy/groups";
import type { PageCopyMediaItem } from "@/lib/page-copy/model-types";
import type { PageCopyEditorModel } from "@/lib/page-copy/model-types";

type PageCopyEditorProps = {
  model: PageCopyEditorModel;
};

function builtinDraft(fields: PageCopyEditorModel["fields"]) {
  return draftFromFields(fields, (field, locale) => field.defaults[locale]);
}

function isMediaDirty(current: PageCopyMediaItem[], saved: PageCopyMediaItem[]): boolean {
  return JSON.stringify(current) !== JSON.stringify(saved);
}

function hasUnsavedEdits(state: PageCopyState): boolean {
  if (state.status.success) {
    return false;
  }

  return isDraftDirty(state.model.fields, state.draft) || isMediaDirty(state.media, state.model.media);
}

function leaveToPreviousPage(state: PageCopyState): void {
  if (hasUnsavedEdits(state) && !window.confirm(state.ui.pagesLeaveConfirm)) {
    return;
  }

  state.goBack();
}

function PageCopyBackLink({ state }: { state: PageCopyState }) {
  return (
    <button type="button" className="page-copy-back" onClick={() => leaveToPreviousPage(state)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="page-copy-back-icon">
        <path
          d="M15 6L9 12L15 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {state.ui.pagesBack}
    </button>
  );
}

function PageCopyHeading({ state }: { state: PageCopyState }) {
  const viewHref = `/en${state.model.publicPath === "/" ? "" : state.model.publicPath}`;

  return (
    <>
      <PageCopyBackLink state={state} />
      <header className="page-copy-heading">
        <div>
          <h1 className="admin-page-title">{state.model.title[state.adminLocale]}</h1>
          <p className="admin-page-subtitle">{state.model.description[state.adminLocale]}</p>
        </div>
        <a className="btn btn-admin-secondary" href={viewHref} target="_blank" rel="noreferrer">
          {state.ui.pagesView}
        </a>
      </header>
    </>
  );
}

function PageCopyToolbar({ state }: { state: PageCopyState }) {
  const completeLocales = localesWithEdits(
    state.model.fields,
    (field, locale) => state.draft[locale][field.path] !== field.defaults[locale],
  );

  return (
    <div className="page-copy-toolbar">
      <ProjectLanguageTabs
        activeTab={state.activeLocale}
        completeLocales={completeLocales}
        onTabChange={state.setActiveLocale}
      />
      <input
        className="page-copy-search"
        value={state.query}
        onChange={(event) => state.setQuery(event.target.value)}
        placeholder={state.ui.pagesSearch}
        type="search"
      />
      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={state.editedOnly}
          onChange={(event) => state.setEditedOnly(event.target.checked)}
        />
        {state.ui.pagesEditedOnly}
      </label>
    </div>
  );
}

async function saveDraft(state: PageCopyState): Promise<void> {
  state.setIsSaving(true);
  state.setStatus({});
  const result = await savePageCopyAction(state.model.id, state.draft, state.media);
  state.setStatus(result);
  state.setIsSaving(false);
  if (result.success) {
    state.refresh();
  }
}

async function resetDraft(state: PageCopyState): Promise<void> {
  if (!window.confirm(state.ui.pagesResetConfirm)) {
    return;
  }

  state.setIsResetting(true);
  state.setStatus({});
  const result = await resetPageCopyAction(state.model.id);
  if (result.success) {
    state.setDraft(builtinDraft(state.model.fields));
    if (result.media) {
      state.setMedia(result.media);
    }
    state.refresh();
  }
  state.setStatus(result);
  state.setIsResetting(false);
}

function PageCopySaveBar({ state }: { state: PageCopyState }) {
  return (
    <div className="page-copy-bar">
      <p>
        {state.model.fields.length} {state.ui.pagesFields}
      </p>
      <div className="page-copy-bar-actions">
        <button
          type="button"
          className="btn btn-admin-secondary"
          disabled={state.isResetting || state.isSaving}
          onClick={() => void resetDraft(state)}
        >
          {state.isResetting ? state.ui.pagesResetting : state.ui.pagesReset}
        </button>
        <button
          type="button"
          className="btn btn-admin-primary"
          disabled={state.isSaving || state.isResetting}
          onClick={() => void saveDraft(state)}
        >
          {state.isSaving ? state.ui.pagesSaving : state.ui.pagesSave}
        </button>
      </div>
    </div>
  );
}

function updateField(state: PageCopyState, path: string, value: string): void {
  state.setDraft({
    ...state.draft,
    [state.activeLocale]: { ...state.draft[state.activeLocale], [path]: value },
  });
  state.setStatus({});
}

function useLeaveWarning(state: PageCopyState): void {
  const dirty = hasUnsavedEdits(state);

  useEffect(() => {
    if (!dirty) {
      return;
    }

    function warn(event: BeforeUnloadEvent): void {
      event.preventDefault();
    }

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}

export function PageCopyEditor({ model }: PageCopyEditorProps) {
  const state = usePageCopyState(model);
  useLeaveWarning(state);

  return (
    <div className="page-copy-editor">
      <PageCopyHeading state={state} />
      <PageCopyToolbar state={state} />
      {state.status.error ? <p className="form-error">{state.status.error}</p> : null}
      {state.status.success === "saved" ? <p className="form-success">{state.ui.pagesSaved}</p> : null}
      {state.status.success === "reset" ? <p className="form-success">{state.ui.pagesResetDone}</p> : null}
      <PageCopyMedia
        pageId={state.model.id}
        items={state.media}
        title={state.ui.pagesMedia}
        addImageLabel={state.ui.pagesAddImage}
        addVideoLabel={state.ui.pagesAddVideo}
        replaceLabel={state.ui.pagesReplaceMedia}
        deleteLabel={state.ui.pagesDeleteMedia}
        deleteConfirm={state.ui.pagesDeleteMediaConfirm}
        uploadingLabel={state.ui.pagesUploading}
        hint={state.ui.pagesMediaHint}
        nameLabel={state.ui.pagesMediaName}
        dropLabel={state.ui.pagesMediaDrop}
        videoLabel={state.ui.pagesMediaVideo}
        imageLabel={state.ui.pagesMediaImage}
        onChange={(items) => {
          state.setMedia(items);
          state.setStatus({});
        }}
      />
      <PageCopyGroups state={state} onChange={(path, value) => updateField(state, path, value)} />
      <PageCopySaveBar state={state} />
    </div>
  );
}
