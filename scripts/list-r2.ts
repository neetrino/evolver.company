import { config } from "dotenv";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

config({ path: ".env" });

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function listAll(): Promise<string[]> {
  let token: string | undefined;
  const keys: string[] = [];

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
        ContinuationToken: token,
      }),
    );

    for (const obj of res.Contents ?? []) {
      if (obj.Key) {
        keys.push(obj.Key);
      }
    }

    token = res.NextContinuationToken;
  } while (token);

  return keys;
}

async function main(): Promise<void> {
  const keys = await listAll();
  console.log(`Total objects: ${keys.length}`);
  for (const key of keys.sort()) {
    console.log(key);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
