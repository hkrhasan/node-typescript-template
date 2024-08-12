import morgan from "morgan";
import { httpLogger } from "../utility";

export const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // Configure Morgan to use our custom httpLogger with the http severity
      write: (message) => httpLogger.http(message.trim()),
    },
  }
);
