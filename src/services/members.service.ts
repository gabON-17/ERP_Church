import { stringify } from "node:querystring";
import { MemberEntity } from "../entitys/Member.entity";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { MembersModel } from "../models/members.model";
import { MinistryModel } from "../models/ministry.model";
import { MemberDTO } from "../utils/dtos/member.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../utils/types/internalRes";

export class MembersSerice {
  constructor(
    private readonly membersModel: MembersModel,
    private readonly ministryModel: MinistryModel
  ) {}

  async create(memberDTO: MemberDTO): Promise<InternalRes> {
    LoggerUtil.info("USER SERVICE --> Criando o usuário...");

    const ministrys: Array<MinistryEntity> = memberDTO.ministrys.map((value): MinistryEntity | null => {
      if (typeof value !== "string") return null
      const ministry: Promise<InternalRes> = this.ministryModel.findMinistrys([value])
        .then((value) => {
          if (!value.status) return null
          return value.data
        })
      return null
    }).filter((ministry) => ministry !== null)

    memberDTO.ministrys = ministrys
    const repositoryResponse: InternalRes = await this.membersModel.create(
      memberDTO
    );

    repositoryResponse.status
      ? LoggerUtil.info(`USER SERVICE --> Usuário criado!`)
      : LoggerUtil.error("USER SERVICE --> ERROR ao criar usuário");

    return { status: true };
  }

  async findAll(): Promise<InternalRes> {
    LoggerUtil.info("USER SERVICE --> Consultando banco...");
    const response: InternalRes = await this.membersModel.findAll();
    const members: MemberEntity[] = await response.data;

    return { status: true, data: members };
  }

  async findOne(uuid: string): Promise<null | MemberEntity> {
    const member: InternalRes = await this.membersModel.findOne(uuid);

    if (member.status) {
      member.data.address = JSON.parse(member.data.address);
    }

    return member.data;
  }
}
