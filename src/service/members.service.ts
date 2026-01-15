import { MemberEntity } from "../entitys/Member.entity";
import { MembersRepository } from "../model/members.model";
import { MemberDTO } from "../utils/dtos/member.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { ResModel } from "../utils/types/ResModel";

export class MembersSerice {
  constructor(readonly membersRepositoty: MembersRepository) {}

  async create(memberDTO: MemberDTO): Promise<void | boolean> {
    LoggerUtil.info("USER SERVICE --> Criando o usuário...");

    const repositoryResponse: ResModel = await this.membersRepositoty.create(
      memberDTO
    );

    repositoryResponse.status
      ? LoggerUtil.info(`USER SERVICE --> Usuário criado!`)
      : LoggerUtil.error("USER SERVICE --> ERROR ao criar uauário");

    return repositoryResponse.status;
  }

  async findAll(): Promise<MemberEntity[]> {
    LoggerUtil.info("USER SERVICE --> Consultando banco...");
    const response: ResModel = await this.membersRepositoty.findAll();
    const members: MemberEntity[] = await response.data;

    members.map((value) => {
      value.address = JSON.parse(value.address);
    });

    return members;
  }

  async findOne(uuid: string): Promise<null | MemberEntity> {
    const member: ResModel = await this.membersRepositoty.findOne(uuid);

    if (member.status) {
      member.data.address = JSON.parse(member.data.address);
    }

    return member.data;
  }
}
