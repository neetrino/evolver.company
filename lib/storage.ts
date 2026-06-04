import { randomUUID } from "crypto";
import path from "path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

export type UploadedFile = {
  url: string;
  key: string;
};

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
};

function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error(
      "R2 storage is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL.",
    );
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl };
}

function createS3Client(config: R2Config): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

function getExtension(filename: string, mimeType: string): string {
  const fromName = path.extname(filename).toLowerCase();
  if (fromName) {
    return fromName;
  }

  const mimeMap: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
  };

  return mimeMap[mimeType] ?? ".bin";
}

export function validateImageFile(file: File): void {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    throw new Error("Unsupported file type. Allowed: JPEG, PNG, WebP, AVIF.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("File exceeds maximum size of 10MB.");
  }
}

export type UploadContext = "project" | "homeHero";

function buildHomeHeroObjectKey(filename: string, mimeType: string): string {
  const extension = getExtension(filename, mimeType);
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `home-hero/${year}/${month}/${Date.now()}-${randomUUID()}${extension}`;
}

function buildProjectObjectKey(folder: string, filename: string, mimeType: string): string {
  const extension = getExtension(filename, mimeType);
  return `projects/${folder}/${Date.now()}-${randomUUID()}${extension}`;
}

function buildObjectKey(
  context: UploadContext,
  folder: string,
  filename: string,
  mimeType: string,
): string {
  if (context === "homeHero") {
    return buildHomeHeroObjectKey(filename, mimeType);
  }

  return buildProjectObjectKey(folder, filename, mimeType);
}

function getPublicUrl(publicBase: string, key: string): string {
  const normalizedBase = publicBase.replace(/\/$/, "");
  return `${normalizedBase}/${key}`;
}

export async function uploadFileToR2(
  file: File,
  folder: string = "temp",
  context: UploadContext = "project",
): Promise<UploadedFile> {
  validateImageFile(file);

  const config = getR2Config();
  const client = createS3Client(config);
  const key = buildObjectKey(context, folder, file.name, file.type);
  const body = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: body,
      ContentType: file.type,
    }),
  );

  return {
    key,
    url: getPublicUrl(config.publicUrl, key),
  };
}

export async function deleteFileFromR2(key: string): Promise<void> {
  if (!key.trim()) {
    return;
  }

  const config = getR2Config();
  const client = createS3Client(config);

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: key,
    }),
  );
}

export function getR2PublicHostname(): string | null {
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!publicUrl) {
    return null;
  }

  try {
    return new URL(publicUrl).hostname;
  } catch {
    return null;
  }
}
