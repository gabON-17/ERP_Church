import { NextFunction, Request, Response } from "express";
import { ParamsVerify } from "../utils/types/params";
import { LoggerUtil } from "../utils/logger/Logger.util";

export class VerifyParamsMiddleware {
  static verifyParams(
    req: Request,
    res: Response,
    next: NextFunction,
    typeParams: ParamsVerify
  ) {
    const reqParam: Object | undefined = req.params;
    const keys: string[] = Object.keys(reqParam);
    let param;

    if (!reqParam) {
      res
        .status(400)
        .json({ message: "Parametros não enviados", statusCode: 400 });
    }

    if (typeof typeParams.type === "number") {
      try {
        const key: string = keys[0];
        if (!(key in reqParam!)) {
          return res.status(400).json({
            message: "Error. Parâmetro não encontrado na url",
            statusCode: 400,
          });
        }

        const value = (reqParam as string | any)[key];
        param = Number(value);
        if (isNaN(param)) {
          throw TypeError("Parametro invalido");
        }
      } catch (e: any) {
        if (e instanceof TypeError) {
          res.status(400).json({
            message: `Error. O sistema espera um parâmetro do tipo ${typeof typeParams.type}`,
            statusCode: 400,
          });
        }
        LoggerUtil.error(`VERIFY PARAMS MIDDLEWARE --> Error: ${e.message}`);
      }
    }
    next();
  }
}
