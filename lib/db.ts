import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set.");
  }

  const pool = new Pool({ connectionString: normalizeDatabaseUrl(connectionString) });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function hasPostDelegate(client: PrismaClient): boolean {
  return typeof client.post?.findMany === "function";
}

function resolvePrismaClient(): PrismaClient {
  const existing = globalForPrisma.prisma;

  // After `prisma generate` adds models, a stale global client can lack new delegates.
  if (existing && hasPostDelegate(existing)) {
    return existing;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = resolvePrismaClient();
