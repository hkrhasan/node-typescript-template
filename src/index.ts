import express from "express";
import cors from "cors";
import Config from "./config";
import routes from "./routes";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import { morganMiddleware } from "./middlewares";
import { logger, notFound } from "./utility";

// CONSTANTS
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
  app.use("/api/v1", routes);
  app.use("*", notFound);

  const server = createServer(app);
  server.listen(Config.PORT, () => {
    logger.info(`Server is running on port ${Config.PORT}`);
  });
}

main()
  .then(async () => {
    try {
      await prisma.$connect();
      logger.info("Database connected");
    } catch (error) {
      throw error;
    }
  })
  .catch(async (err) => {
    logger.error("Error: ", err);
    await prisma.$disconnect();
    process.exit(1);
  });
