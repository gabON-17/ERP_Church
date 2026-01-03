import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger/logger.config";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UserDTO } from "../dtos/user.dto";

export class VerifyDtoMiddleware {
  static async verifyDTO(req: Request, res: Response, next: NextFunction) {
    const body: undefined = req.body;
    let errors: ValidationError[] = [];

    if (!body) {
      logger.debug("Body da requisição não enviado para o middleware");
      return res
        .status(403)
        .json({ message: "Error. body não enviado", stausCode: 403 });
    }

    try {
      const result: unknown = plainToInstance(UserDTO, body);

      typeof result == "object" && result
        ? (errors = await validate(result))
        : new Error("Error no Middleware; VerifyDtoMiddleware");

      if (errors.length === 0) return next();

      logger.debug("Error no middleware: VerifyDtoMiddleware");
      return res
        .status(400)
        .json({ message: `Error: ${errors}`, statusCode: 400 });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Error no servidor", statusCode: 500 });
    }
  }
}
