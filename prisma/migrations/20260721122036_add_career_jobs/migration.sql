-- CreateTable
CREATE TABLE "CareerJob" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverImageKey" TEXT,
    "salary" TEXT NOT NULL,
    "workHours" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerJobTranslation" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CareerJobTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CareerJob_slug_key" ON "CareerJob"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CareerJobTranslation_jobId_locale_key" ON "CareerJobTranslation"("jobId", "locale");

-- CreateIndex
CREATE INDEX "CareerApplication_jobId_idx" ON "CareerApplication"("jobId");

-- CreateIndex
CREATE INDEX "CareerApplication_isRead_idx" ON "CareerApplication"("isRead");

-- AddForeignKey
ALTER TABLE "CareerJobTranslation" ADD CONSTRAINT "CareerJobTranslation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "CareerJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerApplication" ADD CONSTRAINT "CareerApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "CareerJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
