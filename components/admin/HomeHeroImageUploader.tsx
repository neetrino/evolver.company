"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadHomeHeroImageToAdmin } from "@/lib/upload-client";

type HomeHeroImageUploaderProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  clearLabel?: string;
};

function isExternalImage(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function HomeHeroImageUploader({
  label,
  value,
  onChange,
  onClear,
  clearLabel = "Remove image",
}: HomeHeroImageUploaderProps) {
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
      const uploaded = await uploadHomeHeroImageToAdmin(fileList[0]);
      onChange(uploaded.url);
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
    <div>
      <p className="mb-2 text-sm font-medium text-black">{label}</p>

      {value ? (
        <div className="mb-3 overflow-hidden rounded-lg border border-[#dcc090]/35 bg-white">
          <Image
            src={value}
            alt={`${label} preview`}
            width={640}
            height={360}
            unoptimized={isExternalImage(value)}
            className="h-40 w-full object-cover"
          />
        </div>
      ) : null}

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
          {isUploading ? `Uploading ${label.toLowerCase()}...` : `Drag and drop ${label.toLowerCase()} here`}
        </p>
        <p className="upload-dropzone-hint">or click to select a file (JPEG, PNG, WebP, AVIF, max 10MB)</p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border border-[#dcc090]/40 bg-[#dcc090]/15 px-3 py-2 text-sm text-black transition hover:border-[#dcc090] hover:bg-[#dcc090]/25"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : value ? "Replace" : "Upload"}
        </button>
        {value && onClear ? (
          <button
            type="button"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100"
            onClick={onClear}
            disabled={isUploading}
          >
            {clearLabel}
          </button>
        ) : null}
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

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
