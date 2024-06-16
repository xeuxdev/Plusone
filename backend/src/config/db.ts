import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as { prisma?: PrismaClient };

export let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  db = globalForPrisma.prisma;
}

export default db;
