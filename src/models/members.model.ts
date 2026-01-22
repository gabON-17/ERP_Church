import { DataSource, Repository } from "typeorm";
import { MemberEntity } from "../entitys/Member.entity";
import { MemberDTO } from "../utils/dtos/member.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../utils/types/internalRes";
import { MinistryModel } from "./ministry.model";
import { MinistryEntity } from "../entitys/Ministry.entity";

export class MembersModel {
  constructor(
    private readonly dataSource: DataSource,
    private readonly memberRepository: Repository<MemberEntity> = dataSource.getRepository(MemberEntity),
  ) {}

  async create(member: MemberDTO): Promise<InternalRes> {
    
    try {
      for (let object of member.ministrys) {
        if (!(object instanceof MinistryEntity)) throw new Error("Ministério inválido")
      }
    } catch (e: any) {
      return { status: false, error: e }
    }

    const newMember: MemberEntity = {
      uuid: crypto.randomUUID(),
      full_name: member.full_name,
      social_name: member.social_name,
      date_birth: member.date_birth,
      sex: member.sex,
      email: member.email,
      passwordHash: member.password,
      telephone: member.telephone,
      address: JSON.stringify(member.address),
      date_baptism: member.date_baptism,
      ministry: member.ministrys,
      status: "Ativo",
      presence: 0,
    };

    try {
      this.memberRepository.save(newMember);

      LoggerUtil.info(`MODEL --> Usuário cadastrado!`);
      return { status: true };
    } catch (e: any) {
      LoggerUtil.error(`MODEL --> Error ao cadastrar o usuário ${e}`);
      return { status: false, error: e };
    }
  }

  async findAll(): Promise<InternalRes> {
    try {
      const users: MemberEntity[] = await this.memberRepository.find({
        relations: ["ministry"],
      });

      users.map((value) => (value.address = JSON.parse(value.address)));

      return { status: true, data: users };
    } catch (e) {
      LoggerUtil.error(
        `USER MODEL --> ERROR ao tentar buscar todos os usuários do banco de dados: ${e}`
      );
      return { status: false };
    }
  }

  async findOne(uuid: string): Promise<InternalRes> {
    try {
      const member: null | MemberEntity = await this.memberRepository.findOne({
        where: { uuid: uuid },
        relations: ["ministry"],
        select: { ministry: true },
      });

      if (!member) throw Error("Usuário nao encontrado");

      return { status: true, data: member };
    } catch (e: any) {
      LoggerUtil.error(`MEMBERS REPOSITORY --> ERROR: ${e.message}`);
      return { status: false, error: e.message };
    }
  }
}
