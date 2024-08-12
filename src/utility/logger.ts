import stackTrace from "stack-trace";
import { format, createLogger, transports } from "winston";
const { combine, timestamp, json, label, align, printf, errors } = format;

const logConfig = {
  transports: [new transports.Console()],
  format: combine(
    label({
      label: `API - ${process.env.NODE_ENV}`,
    }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    errors({ stack: true }),
    align(),
    printf((info) => {
      const stack = stackTrace.get();
      const fileName = stack[stack.length - 1].getFileName();
      const lineNumber = stack[stack.length - 1].getLineNumber();

      if (info.level === "error") {
        info.label = `${info.label} - ${fileName}:${lineNumber}`;
      }
      return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
    })
  ),
};

export const logger = createLogger({
  transports: [
    // Console Log
    new transports.Console(logConfig),
  ],
  exitOnError: false,
});

export const httpLogger = createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [new transports.Console()],
});
