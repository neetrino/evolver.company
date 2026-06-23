import { createReadStream } from "fs";
import { readdir, unlink } from "fs/promises";
import path from "path";
import { config } from "dotenv";
import {
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

config({ path: ".env" });

const PUBLIC_DIR = path.join(process.cwd(), "public");
const STATIC_PREFIX = "static";
const SKIP_EXTENSIONS = new Set([".svg"]);

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("R2 credentials are not fully configured in .env");
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName };
}

function createClient(config: R2Config): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

function toPosixRelativePath(absolutePath: string): string {
  return path.relative(PUBLIC_DIR, absolutePath).split(path.sep).join("/");
}

function toR2Key(relativePath: string): string {
  return `${STATIC_PREFIX}/${relativePath}`;
}

function getMimeType(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  return MIME_TYPES[extension] ?? "application/octet-stream";
}

async function collectMediaFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMediaFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && !SKIP_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function listExistingKeys(client: S3Client, bucketName: string): Promise<Set<string>> {
  let token: string | undefined;
  const keys = new Set<string>();

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: token,
      }),
    );

    for (const object of response.Contents ?? []) {
      if (object.Key) {
        keys.add(object.Key);
      }
    }

    token = response.NextContinuationToken;
  } while (token);

  return keys;
}

async function objectExists(
  client: S3Client,
  bucketName: string,
  key: string,
  existingKeys: Set<string>,
): Promise<boolean> {
  if (existingKeys.has(key)) {
    return true;
  }

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    existingKeys.add(key);
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(
  client: S3Client,
  bucketName: string,
  localPath: string,
  key: string,
): Promise<void> {
  const body = createReadStream(localPath);

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: getMimeType(localPath),
    }),
  );
}

async function main(): Promise<void> {
  const r2Config = getR2Config();
  const client = createClient(r2Config);
  const existingKeys = await listExistingKeys(client, r2Config.bucketName);
  const localFiles = await collectMediaFiles(PUBLIC_DIR);

  let uploaded = 0;
  let skipped = 0;
  let removed = 0;

  for (const localPath of localFiles.sort()) {
    const relativePath = toPosixRelativePath(localPath);
    const key = toR2Key(relativePath);
    const alreadyStored = await objectExists(client, r2Config.bucketName, key, existingKeys);

    if (alreadyStored) {
      skipped += 1;
      console.log(`exists  ${key}`);
    } else {
      await uploadFile(client, r2Config.bucketName, localPath, key);
      uploaded += 1;
      console.log(`upload  ${key}`);
    }

    await unlink(localPath);
    removed += 1;
    console.log(`delete  public/${relativePath}`);
  }

  console.log(`Done. uploaded=${uploaded}, skipped=${skipped}, removed=${removed}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
