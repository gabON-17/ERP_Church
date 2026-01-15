import { NextFunction, Request, Response } from "express";
import { MinistryService } from "../service/ministry.service";
import { MinistryEntity } from "../entitys/Ministry.entity";

export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  async create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response> {
    const status: boolean = await this.ministryService.create(req.body);

    if (status) {
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
    const ministrys: MinistryEntity[] | null =
      await this.ministryService.findAll();

    if (!ministrys)
      return res
        .status(404)
        .json({ message: "Nenhum ministétério encontrado", statusCode: 404 });

    return res.status(200).json({
      message: "Ministérios encontrados!",
      total_Ministrys: ministrys?.length,
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

    const ministry: null | MinistryEntity[] =
      await this.ministryService.findOne(uuid);

    if (!ministry) {
      return res
        .status(404)
        .json({ message: "Ministério não encontrado", statusCode: 404 });
    }

    return res
      .status(200)
      .json({ message: "OK", statusCode: 200, ministry: ministry });
  }
}
