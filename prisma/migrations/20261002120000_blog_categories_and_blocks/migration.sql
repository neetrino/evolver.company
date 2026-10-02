-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "imageKey" TEXT,
    "headerImage" TEXT,
    "headerImageKey" TEXT,
    "galleryContent" JSONB,
    "contentBlocks" JSONB,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "featuredOrder" INTEGER,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- Migrate existing posts into translatable JSON fields.
INSERT INTO "BlogPost" (
    "id",
    "title",
    "slug",
    "content",
    "shortDescription",
    "image",
    "imageKey",
    "publishedAt",
    "isPublished",
    "createdAt",
    "updatedAt"
)
SELECT
    p."id",
    COALESCE((
        SELECT json_build_object(
            '__at_i18n_v1', true,
            'values', json_object_agg(t."locale", t."title")
        )::text
        FROM "PostTranslation" t
        WHERE t."postId" = p."id" AND length(btrim(t."title")) > 0
    ), ''),
    p."slug",
    COALESCE((
        SELECT json_build_object(
            '__at_i18n_v1', true,
            'values', json_object_agg(t."locale", t."description")
        )::text
        FROM "PostTranslation" t
        WHERE t."postId" = p."id" AND length(btrim(t."description")) > 0
    ), ''),
    COALESCE((
        SELECT json_build_object(
            '__at_i18n_v1', true,
            'values', json_object_agg(t."locale", t."description")
        )::text
        FROM "PostTranslation" t
        WHERE t."postId" = p."id" AND length(btrim(t."description")) > 0
    ), ''),
    p."coverImage",
    p."coverImageKey",
    p."createdAt",
    p."isPublished",
    p."createdAt",
    p."updatedAt"
FROM "Post" p;

-- Drop old blog tables
DROP TABLE "PostTranslation";
DROP TABLE "Post";

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");
CREATE INDEX "BlogCategory_order_idx" ON "BlogCategory"("order");
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_isPublished_publishedAt_idx" ON "BlogPost"("isPublished", "publishedAt");
CREATE INDEX "BlogPost_order_idx" ON "BlogPost"("order");
CREATE INDEX "BlogPost_featuredOnHome_featuredOrder_idx" ON "BlogPost"("featuredOnHome", "featuredOrder");
CREATE INDEX "BlogPost_categoryId_idx" ON "BlogPost"("categoryId");

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
