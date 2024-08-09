import express from "express";
import cors from "cors";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";

import { morganMiddleware } from "./middlewares";
import { logger } from "./utility";

// CONSTANTS
const PORT = process.env.PORT || 3000;
const app = express();
const prisma = new PrismaClient();

async function main() {
  // initialize middlewares here
  app.use(morganMiddleware);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "1.5mb" }));
  app.use(cors());

  // TODO: Add routes here
  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const server = createServer(app);
  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
    logger.info("Database connected");
  })
  .catch(async (err) => {
    logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
