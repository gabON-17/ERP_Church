import pino from "pino";

export const logger = pino({
  level: process.env.LEVEL ?? "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "dd-mm-yyyy HH:MM:ss",
    },
  },
});
