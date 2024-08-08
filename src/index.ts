import express from "express";
import cors from "cors";
import { createServer } from "http";
import { morganMiddleware, logger } from "./middlewares";

// CONSTANTS
const PORT = process.env.PORT || 3000;
const app = express();

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

  return createServer(app);
}

main()
  .then((server) => {
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
