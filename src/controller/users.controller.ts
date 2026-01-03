import { Request, Response } from "express";
import { logger } from "../logger/logger.config";
import { Logger } from "pino";
import { UsersService } from "../service/users.service";
import { UserEntity } from "../entitys/user.entity";

export class UsersController {
  constructor(readonly logger: Logger, readonly usersService: UsersService) {}

  findOne(req: Request, res: Response): void {
    res.status(200).json({ message: "findOne" });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const list_user: UserEntity[] | undefined =
      await this.usersService.findAll();

    if (list_user == undefined || list_user.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado", statusCode: 404 });
    }

    return res
      .status(200)
      .json({ users: list_user, message: "OK", statusCode: 200 });
  }

  async create(req: Request, res: Response) {
    logger.info("Requisição feita");

    const serviceResponse: void | unknown = await this.usersService.create(
      req.body
    );

    if (serviceResponse) {
      return res
        .status(403)
        .json({ message: "Error. Usuário não definido", statusCode: 403 });
    }

    return res.status(201).json({ message: "Create", statusCode: 201 });
  }
}
