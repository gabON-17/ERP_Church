import pino, { levels } from "pino";

export const logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "dd-mm-yyyy HH:MM:ss",
    },
  },
});
