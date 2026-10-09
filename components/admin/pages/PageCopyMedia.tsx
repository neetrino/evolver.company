"use client";

import Image from "next/image";
import { useState, useRef, type ChangeEvent, type RefObject } from "react";
import type { PageCopyMediaItem, PageCopyMediaKind } from "@/lib/page-copy/model-types";
import { uploadFilesToAdmin } from "@/lib/upload-client";
import { PageCopyMediaDrop } from "@/components/admin/pages/PageCopyMediaDrop";

const MEDIA_PREVIEW_WIDTH = 240;
const MEDIA_PREVIEW_HEIGHT = 136;
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/avif";
const VIDEO_ACCEPT = "video/mp4,video/webm";
const FILE_ACCEPT = `${IMAGE_ACCEPT},${VIDEO_ACCEPT}`;

type PageCopyMediaProps = {
  pageId: string;
  items: PageCopyMediaItem[];
  title: string;
  addImageLabel: string;
  addVideoLabel: string;
  replaceLabel: string;
  deleteLabel: string;
  deleteConfirm: string;
  uploadingLabel: string;
  hint: string;
  nameLabel: string;
  dropLabel: string;
  videoLabel: string;
  imageLabel: string;
  onChange: (items: PageCopyMediaItem[]) => void;
};

function takeFile(event: ChangeEvent<HTMLInputElement>): File | undefined {
  const file = event.target.files?.[0];
  event.target.value = "";
  return file;
}

function kindFromFile(file: File): PageCopyMediaKind {
  return file.type.startsWith("video/") ? "video" : "image";
}

function labelFromFile(file: File): string {
  const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").trim();
  return name.slice(0, 120) || "Media";
}

async function uploadPageFile(pageId: string, file: File): Promise<PageCopyMediaItem> {
  const uploaded = await uploadFilesToAdmin([file], pageId, "pageMedia");
  const saved = uploaded[0];

  if (!saved) {
    throw new Error("Upload failed");
  }

  return {
    id: `media-${crypto.randomUUID()}`,
    label: labelFromFile(file),
    src: saved.url,
    kind: kindFromFile(file),
  };
}

async function applyUpload(
  pageId: string,
  file: File | undefined,
  apply: (uploaded: PageCopyMediaItem) => void,
  setError: (value: string | null) => void,
  setUploading: (value: boolean) => void,
): Promise<void> {
  if (!file) {
    return;
  }

  setUploading(true);
  setError(null);
  try {
    apply(await uploadPageFile(pageId, file));
  } catch (uploadError) {
    setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
  } finally {
    setUploading(false);
  }
}

function PageCopyMediaPreview({ item }: { item: PageCopyMediaItem }) {
  if (item.kind === "video") {
    return (
      <video className="page-copy-media-preview" src={item.src} controls muted playsInline preload="metadata" />
    );
  }

  return (
    <Image
      className="page-copy-media-preview"
      src={item.src}
      alt={item.label}
      width={MEDIA_PREVIEW_WIDTH}
      height={MEDIA_PREVIEW_HEIGHT}
      unoptimized
    />
  );
}

function PageCopyMediaCard({
  item,
  nameLabel,
  kindLabel,
  replaceLabel,
  deleteLabel,
  disabled,
  onRename,
  onReplace,
  onDelete,
}: {
  item: PageCopyMediaItem;
  nameLabel: string;
  kindLabel: string;
  replaceLabel: string;
  deleteLabel: string;
  disabled: boolean;
  onRename: (label: string) => void;
  onReplace: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="page-copy-media-card">
      <div className="page-copy-media-stage">
        <span className={`page-copy-media-kind page-copy-media-kind-${item.kind}`}>{kindLabel}</span>
        <PageCopyMediaPreview item={item} />
      </div>
      <label className="page-copy-media-field">
        <span>{nameLabel}</span>
        <input
          className="page-copy-media-label"
          value={item.label}
          maxLength={120}
          onChange={(event) => onRename(event.target.value)}
        />
      </label>
      <div className="page-copy-media-actions">
        <button type="button" className="btn btn-admin-secondary" disabled={disabled} onClick={onReplace}>
          {replaceLabel}
        </button>
        <button type="button" className="btn btn-admin-danger" disabled={disabled} onClick={onDelete}>
          {deleteLabel}
        </button>
      </div>
    </li>
  );
}

type MediaEditorProps = PageCopyMediaProps & {
  error: string | null;
  isUploading: boolean;
  addImageRef: RefObject<HTMLInputElement | null>;
  addVideoRef: RefObject<HTMLInputElement | null>;
  replaceRef: RefObject<HTMLInputElement | null>;
  onAdd: (file: File | undefined) => void;
  onReplace: (file: File | undefined) => void;
  onStartReplace: (id: string) => void;
};

function PageCopyMediaList({
  items,
  nameLabel,
  videoLabel,
  imageLabel,
  replaceLabel,
  deleteLabel,
  deleteConfirm,
  isUploading,
  onChange,
  onStartReplace,
}: Pick<
  MediaEditorProps,
  | "items"
  | "nameLabel"
  | "videoLabel"
  | "imageLabel"
  | "replaceLabel"
  | "deleteLabel"
  | "deleteConfirm"
  | "isUploading"
  | "onChange"
  | "onStartReplace"
>) {
  return (
    <ul className="page-copy-media-grid">
      {items.map((item) => (
        <PageCopyMediaCard
          key={item.id}
          item={item}
          nameLabel={nameLabel}
          kindLabel={item.kind === "video" ? videoLabel : imageLabel}
          replaceLabel={replaceLabel}
          deleteLabel={deleteLabel}
          disabled={isUploading}
          onRename={(label) => onChange(items.map((entry) => (entry.id === item.id ? { ...entry, label } : entry)))}
          onReplace={() => onStartReplace(item.id)}
          onDelete={() => {
            if (window.confirm(deleteConfirm)) {
              onChange(items.filter((entry) => entry.id !== item.id));
            }
          }}
        />
      ))}
    </ul>
  );
}

function PageCopyMediaView(props: MediaEditorProps) {
  const { title, hint, error, addImageRef, addVideoRef, replaceRef, onAdd, onReplace } = props;

  return (
    <>
      <div className="page-copy-media-sticky">
        {error ? <p className="form-error">{error}</p> : null}
        <PageCopyMediaDrop
          addImageLabel={props.addImageLabel}
          addVideoLabel={props.addVideoLabel}
          dropLabel={props.dropLabel}
          uploadingLabel={props.uploadingLabel}
          isUploading={props.isUploading}
          addImageRef={addImageRef}
          addVideoRef={addVideoRef}
          onAdd={onAdd}
        />
        <input ref={addImageRef} className="page-copy-media-input" type="file" accept={IMAGE_ACCEPT} onChange={(event) => onAdd(takeFile(event))} />
        <input ref={addVideoRef} className="page-copy-media-input" type="file" accept={VIDEO_ACCEPT} onChange={(event) => onAdd(takeFile(event))} />
        <input ref={replaceRef} className="page-copy-media-input" type="file" accept={FILE_ACCEPT} onChange={(event) => onReplace(takeFile(event))} />
      </div>
      <section className="page-copy-media" aria-label={title}>
        <header className="page-copy-media-head">
          <h2 className="page-copy-media-title">{title}</h2>
          <p className="page-copy-media-hint">{hint}</p>
        </header>
        <PageCopyMediaList {...props} />
      </section>
    </>
  );
}

export function PageCopyMedia(props: PageCopyMediaProps) {
  const addImageRef = useRef<HTMLInputElement>(null);
  const addVideoRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const replaceId = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <PageCopyMediaView
      {...props}
      error={error}
      isUploading={isUploading}
      addImageRef={addImageRef}
      addVideoRef={addVideoRef}
      replaceRef={replaceRef}
      onAdd={(file) =>
        void applyUpload(props.pageId, file, (uploaded) => props.onChange([...props.items, uploaded]), setError, setIsUploading)
      }
      onReplace={(file) =>
        void applyUpload(
          props.pageId,
          file,
          (uploaded) => {
            const id = replaceId.current;
            if (!id) {
              return;
            }
            props.onChange(props.items.map((item) => (item.id === id ? { ...item, src: uploaded.src, kind: uploaded.kind } : item)));
          },
          setError,
          setIsUploading,
        )
      }
      onStartReplace={(id) => {
        replaceId.current = id;
        replaceRef.current?.click();
      }}
    />
  );
}
