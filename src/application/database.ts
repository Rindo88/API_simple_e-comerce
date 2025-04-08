import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query"
    },
    {
      emit: "event",
      level: "info"
    },
    {
      emit: "event",
      level: "error"
    },
    {
      emit: "event",
      level: "warn"
    }
  ]
});

prisma.$on("error",(e) => console.error(e));
prisma.$on("info",(e) => console.info(e));
prisma.$on("warn",(e) => console.warn(e));
prisma.$on("query",(e) => console.info(e));