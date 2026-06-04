export type UploadedFileResult = {
  url: string;
  key: string;
};

type UploadResponse = {
  success?: boolean;
  files?: UploadedFileResult[];
  error?: string;
};

export async function uploadFilesToAdmin(
  files: File[],
  projectId?: string,
): Promise<UploadedFileResult[]> {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  if (projectId) {
    formData.append("projectId", projectId);
  }

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data: UploadResponse = await response.json();

  if (!response.ok || !data.success || !data.files) {
    throw new Error(data.error ?? "Upload failed");
  }

  return data.files;
}

export async function uploadHomeHeroImageToAdmin(file: File): Promise<UploadedFileResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("context", "homeHero");

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data: UploadResponse = await response.json();

  if (!response.ok || !data.success || !data.files?.[0]) {
    throw new Error(data.error ?? "Upload failed");
  }

  return data.files[0];
}
