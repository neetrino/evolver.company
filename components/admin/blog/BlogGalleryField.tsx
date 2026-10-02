"use client";

import { useRef, useState } from "react";
import { SortableGalleryImages } from "@/components/admin/SortableGalleryImages";
import type { BlogGalleryItem } from "@/lib/blog/blocks";
import type { GalleryImageItem } from "@/lib/project-types";
import { uploadFilesToAdmin } from "@/lib/upload-client";

type BlogGalleryFieldProps = {
  items: BlogGalleryItem[];
  onChange: (items: BlogGalleryItem[]) => void;
  postId?: string;
};

function toGalleryImages(items: BlogGalleryItem[]): GalleryImageItem[] {
  return items
    .filter((item) => item.url.trim() && !item.beforeAfter)
    .map((item) => ({ url: item.url, key: item.key || item.url }));
}

export function BlogGalleryField({ items, onChange, postId }: BlogGalleryFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(files: FileList | File[]): Promise<void> {
    const fileList = Array.from(files);
    if (fileList.length === 0) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadFilesToAdmin(fileList, postId, "blog");
      onChange([...items, ...uploaded.map((file) => ({ url: file.url, key: file.key }))]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleImagesChange(images: GalleryImageItem[]): void {
    onChange(images.map((image) => ({ url: image.url, key: image.key })));
  }

  return (
    <div className="admin-form-field">
      <div
        className="upload-dropzone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void handleUpload(event.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
      >
        <p className="upload-dropzone-title">{isUploading ? "Uploading..." : "Add gallery images"}</p>
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
      />
      {error ? <p className="form-error">{error}</p> : null}
      <SortableGalleryImages images={toGalleryImages(items)} onChange={handleImagesChange} />
    </div>
  );
}
