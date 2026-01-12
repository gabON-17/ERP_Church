import { logger } from "./logger.config";

export class LoggerUtil {
  static info(msg: string) {
    logger.info(msg);
  }

  static debug(msg: string) {
    logger.debug(msg);
  }

  static error(msg: string) {
    logger.error(msg);
  }
}
