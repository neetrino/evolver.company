import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { getProjectCatalogEntries } from "@/lib/project-catalog";
import { getProjectVisual } from "@/lib/project-visuals";
import { normalizeDatabaseUrl } from "@/lib/database-url";

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to run the seed.");
  }

  const pool = new Pool({ connectionString: normalizeDatabaseUrl(connectionString) });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const entry of getProjectCatalogEntries()) {
      const coverImage = getProjectVisual(entry.slug).background;

      await prisma.project.upsert({
        where: { slug: entry.slug },
        create: {
          slug: entry.slug,
          projectUrl: entry.projectUrl,
          coverImage,
          isPublished: true,
          translations: {
            create: [
              {
                locale: "en",
                title: entry.translations.en.title,
                shortDescription: entry.translations.en.shortDescription,
                longDescription: entry.translations.en.longDescription,
              },
              {
                locale: "hy",
                title: entry.translations.hy.title,
                shortDescription: entry.translations.hy.shortDescription,
                longDescription: entry.translations.hy.longDescription,
              },
            ],
          },
        },
        update: {
          projectUrl: entry.projectUrl,
          coverImage,
          isPublished: true,
          translations: {
            deleteMany: {},
            create: [
              {
                locale: "en",
                title: entry.translations.en.title,
                shortDescription: entry.translations.en.shortDescription,
                longDescription: entry.translations.en.longDescription,
              },
              {
                locale: "hy",
                title: entry.translations.hy.title,
                shortDescription: entry.translations.hy.shortDescription,
                longDescription: entry.translations.hy.longDescription,
              },
            ],
          },
        },
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
