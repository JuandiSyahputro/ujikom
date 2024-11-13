import { PrismaClient } from "@prisma/client";
// INI ADALAH FUNGSI UNTUK MEMBUAT KONEKSI DENGAN DATABASE
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
