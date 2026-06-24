import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";
import { isCatalogSlug, PROJECT_CATALOG_ORDER } from "@/lib/project-catalog";

type CatalogSlug = (typeof PROJECT_CATALOG_ORDER)[number];

const VCITY_BACKGROUND_SUFFIX = "/vcity-bg.png";

function inferCatalogSlugFromCoverImage(
  slug: string,
  coverImage: string | null,
): CatalogSlug | null {
  if (slug === "vcity1" && coverImage?.includes(VCITY_BACKGROUND_SUFFIX)) {
    return "vcity";
  }

  if (isCatalogSlug(slug)) {
    return slug;
  }

  return null;
}

function resolveCatalogSlug(
  slug: string,
  catalogSlug: string | null,
  coverImage: string | null,
): CatalogSlug | null {
  if (catalogSlug && isCatalogSlug(catalogSlug)) {
    return catalogSlug;
  }

  if (isCatalogSlug(slug)) {
    return slug;
  }

  return inferCatalogSlugFromCoverImage(slug, coverImage);
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to run the backfill.");
  }

  const pool = new Pool({ connectionString: normalizeDatabaseUrl(connectionString) });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        slug: true,
        catalogSlug: true,
        coverImage: true,
      },
      orderBy: { createdAt: "asc" },
    });

    for (const project of projects) {
      const targetCatalogSlug = resolveCatalogSlug(
        project.slug,
        project.catalogSlug,
        project.coverImage,
      );

      if (!targetCatalogSlug) {
        console.log(`[skip] ${project.slug}: no catalog slug to backfill`);
        continue;
      }

      if (project.catalogSlug === targetCatalogSlug) {
        console.log(`[ok] ${project.slug}: catalogSlug already ${targetCatalogSlug}`);
        continue;
      }

      if (project.catalogSlug && project.catalogSlug !== targetCatalogSlug) {
        console.log(
          `[skip] ${project.slug}: existing catalogSlug=${project.catalogSlug} differs from inferred ${targetCatalogSlug}`,
        );
        continue;
      }

      const before = {
        slug: project.slug,
        catalogSlug: project.catalogSlug,
      };

      await prisma.project.update({
        where: { id: project.id },
        data: { catalogSlug: targetCatalogSlug },
      });

      console.log(`[update] ${project.slug}:`, {
        before,
        after: { slug: project.slug, catalogSlug: targetCatalogSlug },
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
