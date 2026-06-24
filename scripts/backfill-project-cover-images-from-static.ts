import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";
import { getProjectVisual } from "@/lib/project-visuals";

const CATALOG_SLUGS = ["estatedata", "vexpo", "vrealty", "vcity"] as const;

type CatalogSlug = (typeof CATALOG_SLUGS)[number];

function getStaticBackgroundUrl(slug: CatalogSlug): string {
  return getProjectVisual(slug).background;
}

function getLegacyBackgroundPath(slug: CatalogSlug): string {
  return `/images/projects/${slug}-bg.png`;
}

function isUploadedProjectCoverUrl(coverImage: string): boolean {
  const trimmed = coverImage.trim();
  const r2PublicUrl = process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, "");

  if (r2PublicUrl && trimmed.startsWith(`${r2PublicUrl}/projects/`)) {
    return true;
  }

  if (trimmed.startsWith("/cdn/projects/")) {
    return true;
  }

  // R2 upload keys: projects/{folder}/{timestamp}-{uuid}.{ext}
  if (/^https?:\/\/[^/]+\/projects\/[^/]+\/\d+-[a-f0-9-]+\./i.test(trimmed)) {
    return true;
  }

  return false;
}

function shouldBackfillCover(
  slug: CatalogSlug,
  coverImage: string | null,
  coverImageKey: string | null,
  staticUrl: string,
): boolean {
  if (coverImageKey && coverImageKey.trim().length > 0) {
    return false;
  }

  if (!coverImage || coverImage.trim().length === 0) {
    return true;
  }

  const trimmed = coverImage.trim();

  if (trimmed === staticUrl || trimmed === getLegacyBackgroundPath(slug)) {
    return true;
  }

  if (isUploadedProjectCoverUrl(trimmed)) {
    return false;
  }

  return false;
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to run the backfill.");
  }

  const pool = new Pool({ connectionString: normalizeDatabaseUrl(connectionString) });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const slug of CATALOG_SLUGS) {
      const staticUrl = getStaticBackgroundUrl(slug);
      const project = await prisma.project.findUnique({ where: { slug } });

      if (!project) {
        console.log(`[skip] ${slug}: no Project row in DB`);
        continue;
      }

      const before = {
        coverImage: project.coverImage,
        coverImageKey: project.coverImageKey,
      };

      if (!shouldBackfillCover(slug, project.coverImage, project.coverImageKey, staticUrl)) {
        console.log(`[skip] ${slug}: custom uploaded cover preserved`, before);
        continue;
      }

      if (project.coverImage === staticUrl && project.coverImageKey === null) {
        console.log(`[ok] ${slug}: already backfilled`, before);
        continue;
      }

      await prisma.project.update({
        where: { id: project.id },
        data: {
          coverImage: staticUrl,
          coverImageKey: null,
        },
      });

      console.log(`[update] ${slug}:`, {
        before,
        after: { coverImage: staticUrl, coverImageKey: null },
      });
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
