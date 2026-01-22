import { NextFunction, Request, Response } from "express";
import { MinistryService } from "../services/ministry.service";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { InternalRes } from "../utils/types/internalRes";

export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response> {
    const resService: InternalRes = await this.ministryService.create(req.body);

    if (resService.status) {
      return res
        .status(201)
        .json({ message: "Ministério Cadastrado!", statusCode: 201 });
    }

    return res
      .status(400)
      .json({ message: "Error ao cadastrar o ministério", statusCode: 400 });
  }

  async findAll(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response> {
    const ministrys: InternalRes =
      await this.ministryService.findAll();

    if (!ministrys.status)
      return res
        .status(404)
        .json({ message: "Nenhum ministétério encontrado", statusCode: 404 });

    return res.status(200).json({
      message: "Ministérios encontrados!",
      total_Ministrys: ministrys.data.length,
      statusCode: 200,
      ministrys: ministrys,
    });
  }

  async findOne(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response> {
    const uuid: string = req.params.uuid;

    const ministry: InternalRes =
      await this.ministryService.findOne(uuid);

    if (!ministry.status) {
      return res
        .status(404)
        .json({ message: "Ministério não encontrado", statusCode: 404 });
    }

    return res
      .status(200)
      .json({ message: "OK", statusCode: 200, ministry: ministry });
  }
}
