//connect to prisma client and help to use method provided by prisma

import { PrismaClient } from "../../generated/prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
