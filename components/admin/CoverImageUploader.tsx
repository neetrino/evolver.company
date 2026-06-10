"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CoverImageData } from "@/lib/project-types";
import { uploadFilesToAdmin } from "@/lib/upload-client";

type CoverImageUploaderProps = {
  value: CoverImageData | null;
  onChange: (value: CoverImageData | null) => void;
  projectId?: string;
};

export function CoverImageUploader({ value, onChange, projectId }: CoverImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  async function handleUpload(files: FileList | File[]): Promise<void> {
    const fileList = Array.from(files);

    if (fileList.length === 0) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadFilesToAdmin([fileList[0]], projectId);
      const file = uploaded[0];

      if (!file) {
        throw new Error("Upload failed");
      }

      onChange(file);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragActive(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragActive(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragActive(false);
    void handleUpload(event.dataTransfer.files);
  }

  return (
    <div className="admin-form-field">
      <label>Cover image</label>
      <div
        className={`upload-dropzone ${isDragActive ? "upload-dropzone-active" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <p className="upload-dropzone-title">
          {isUploading ? "Uploading cover image..." : "Drag and drop cover image here"}
        </p>
        <p className="upload-dropzone-hint">or click to select a file (JPEG, PNG, WebP, AVIF, max 10MB)</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            void handleUpload(event.target.files);
          }
        }}
        disabled={isUploading}
      />

      {error ? <p className="form-error">{error}</p> : null}

      {value ? (
        <div className="mt-3">
          <Image src={value.url} alt="Cover preview" width={240} height={160} unoptimized className="rounded-lg" />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="btn btn-admin-secondary"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
            >
              Replace
            </button>
            <button type="button" className="btn btn-admin-secondary" onClick={() => onChange(null)}>
              Remove
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
