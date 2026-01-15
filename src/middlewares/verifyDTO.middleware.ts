import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { LoggerUtil } from "../utils/logger/Logger.util";

export class VerifyDtoMiddleware {
  static async verifyDTO(
    req: Request,
    res: Response,
    next: NextFunction,
    dto: any
  ) {
    const body: undefined | Object = req.body;
    let errors: ValidationError[] = [];

    if (!body) {
      LoggerUtil.debug("Body da requisição não enviado para o middleware");
      return res
        .status(403)
        .json({ message: "Error. body não enviado", stausCode: 403 });
    }

    try {
      const result: unknown = plainToInstance(dto, body);

      typeof result == "object" && result
        ? (errors = await validate(result))
        : new Error("Error no Middleware; VerifyDtoMiddleware");

      if (errors.length === 0) {
        return next();
      }

      LoggerUtil.error(
        "Error no middleware: VerifyDtoMiddleware (Body inválido)"
      );

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
