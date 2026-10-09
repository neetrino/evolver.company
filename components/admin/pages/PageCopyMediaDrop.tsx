"use client";

import { useState, type DragEvent, type RefObject } from "react";

type PageCopyMediaDropProps = {
  addImageLabel: string;
  addVideoLabel: string;
  dropLabel: string;
  uploadingLabel: string;
  isUploading: boolean;
  addImageRef: RefObject<HTMLInputElement | null>;
  addVideoRef: RefObject<HTMLInputElement | null>;
  onAdd: (file: File | undefined) => void;
};

export function PageCopyMediaDrop({
  addImageLabel,
  addVideoLabel,
  dropLabel,
  uploadingLabel,
  isUploading,
  addImageRef,
  addVideoRef,
  onAdd,
}: PageCopyMediaDropProps) {
  const [active, setActive] = useState(false);

  function dropFile(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setActive(false);
    onAdd(event.dataTransfer.files[0]);
  }

  return (
    <div
      className={`upload-dropzone page-copy-media-drop ${active ? "upload-dropzone-active" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={dropFile}
    >
      <p>{isUploading ? uploadingLabel : dropLabel}</p>
      <div className="page-copy-media-add">
        <button type="button" className="btn btn-admin-primary" disabled={isUploading} onClick={() => addImageRef.current?.click()}>
          {addImageLabel}
        </button>
        <button type="button" className="btn btn-admin-secondary" disabled={isUploading} onClick={() => addVideoRef.current?.click()}>
          {addVideoLabel}
        </button>
      </div>
    </div>
  );
}
