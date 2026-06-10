"use client";

import { useRef, useState } from "react";
import { SortableGalleryImages } from "@/components/admin/SortableGalleryImages";
import type { GalleryImageItem } from "@/lib/project-types";
import { uploadFilesToAdmin } from "@/lib/upload-client";

type GalleryImageUploaderProps = {
  images: GalleryImageItem[];
  onChange: (images: GalleryImageItem[]) => void;
  projectId?: string;
};

export function GalleryImageUploader({ images, onChange, projectId }: GalleryImageUploaderProps) {
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
      const uploaded = await uploadFilesToAdmin(fileList, projectId);
      onChange([...images, ...uploaded]);
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
      <label>Gallery images</label>
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
          {isUploading ? "Uploading gallery images..." : "Drag and drop gallery images here"}
        </p>
        <p className="upload-dropzone-hint">
          or click to select multiple files (JPEG, PNG, WebP, AVIF, max 10MB each)
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            void handleUpload(event.target.files);
          }
        }}
        disabled={isUploading}
      />

      {error ? <p className="form-error">{error}</p> : null}

      <SortableGalleryImages images={images} onChange={onChange} />
    </div>
  );
}
