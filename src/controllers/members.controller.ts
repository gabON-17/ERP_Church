import { Request, Response } from "express";
import { MembersSerice } from "../services/members.service";
import { MemberEntity } from "../entitys/Member.entity";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../utils/types/internalRes";

export class MembersController {
  constructor(readonly membersService: MembersSerice) {}

  async findOne(req: Request, res: Response): Promise<Response> {
    const uuid: string = req.params.uuid;

    const member: null | MemberEntity = await this.membersService.findOne(uuid);

    if (!member) {
      return res
      .status(404)
      .json({ message: "Membro não encontrado", statusCode: 404 });
    }

    return res
      .status(200)
      .json({ message: "OK", statusCode: 200, member: member });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    LoggerUtil.info("USER CONTROLLER --> Requisição feita");
    const list_user: InternalRes = await this.membersService.findAll();

    if (list_user.data.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado", statusCode: 404 });
    }

    return res.status(200).json({
      message: "OK",
      statusCode: 200,
      totalUsers: list_user.data.length,
      users: list_user,
    });
  }

  async create(req: Request, res: Response): Promise<Response> {
    LoggerUtil.info("USER CONTROLLER --> Requisição feita");

    const serviceResponse: InternalRes = await this.membersService.create(
      req.body
    );

    if (!serviceResponse.status) {
      return res
        .status(403)
        .json({ message: "Error. Usuário não definido", statusCode: 403 });
    }

    return res.status(201).json({ message: "Create", statusCode: 201 });
  }
}
