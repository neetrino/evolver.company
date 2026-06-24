-- AlterTable
ALTER TABLE "Project" ADD COLUMN "catalogSlug" TEXT;

-- CreateIndex
CREATE INDEX "Project_catalogSlug_idx" ON "Project"("catalogSlug");
