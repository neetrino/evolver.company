import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";
import { PROJECT_CATALOG_ORDER } from "@/lib/project-catalog";

const CATALOG_ACCENT_COLORS: Record<(typeof PROJECT_CATALOG_ORDER)[number], string> = {
  estatedata: "#b026ff",
  vexpo: "#5b8cff",
  vrealty: "#ff5c7a",
  vcity: "#00d1b4",
};

function resolveCatalogKey(
  slug: string,
  catalogSlug: string | null,
): (typeof PROJECT_CATALOG_ORDER)[number] | null {
  const key = catalogSlug ?? slug;
  if (key in CATALOG_ACCENT_COLORS) {
    return key as (typeof PROJECT_CATALOG_ORDER)[number];
  }

  return null;
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
        accentColor: true,
      },
      orderBy: { createdAt: "asc" },
    });

    for (const project of projects) {
      const catalogKey = resolveCatalogKey(project.slug, project.catalogSlug);

      if (!catalogKey) {
        console.log(`[skip] ${project.slug}: no catalog color mapping`);
        continue;
      }

      const targetColor = CATALOG_ACCENT_COLORS[catalogKey];

      if (project.accentColor === targetColor) {
        console.log(`[ok] ${project.slug}: accentColor already ${targetColor}`);
        continue;
      }

      if (project.accentColor) {
        console.log(
          `[skip] ${project.slug}: existing accentColor=${project.accentColor} (target ${targetColor})`,
        );
        continue;
      }

      const before = {
        slug: project.slug,
        catalogSlug: project.catalogSlug,
        accentColor: project.accentColor,
      };

      await prisma.project.update({
        where: { id: project.id },
        data: { accentColor: targetColor },
      });

      console.log(`[update] ${project.slug}:`, {
        before,
        after: { slug: project.slug, catalogSlug: project.catalogSlug, accentColor: targetColor },
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
