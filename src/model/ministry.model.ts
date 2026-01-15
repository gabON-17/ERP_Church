import { DataSource, Repository } from "typeorm";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { ResModel } from "../utils/types/ResModel";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { MembersModel } from "./members.model";

export class MinistryModel {
  constructor(
    private readonly dataSource: DataSource,
    private readonly membersRepository: MembersModel,
    private readonly ministryRepository: Repository<MinistryEntity>
  ) {}

  async create(ministryDTO: MinistryDTO): Promise<ResModel> {
    LoggerUtil.debug("MINISTRY MODEL --> Salvando usuário no banco de dados");

    const ministry: MinistryEntity = {
      uuid: crypto.randomUUID(),
      name: ministryDTO.name,
      lead_ministry: ministryDTO.lead_ministry,
      members: [],
      branch: ministryDTO.branch,
    };

    try {
      await this.ministryRepository.save(ministry);
      return { status: true };
    } catch (e: any) {
      LoggerUtil.error(
        `MINISTRY MODEL --> Error ao salvar o usuário: ${e.message}`
      );
      return { status: false };
    }
  }

  async findAll(): Promise<ResModel> {
    LoggerUtil.info("MINISTRY MODEL --> Consultando tabela Ministrys...");
    const ministrys: MinistryEntity[] = await this.ministryRepository.find({
      relations: ["lead_ministry", "members"],
      select: {
        members: {
          uuid: true,
          full_name: true,
          social_name: true,
          email: true,
        },

        lead_ministry: {
          uuid: true,
          full_name: true,
          social_name: true,
          telephone: true,
          email: true,
        },
      },
    });

    if (ministrys.length === 0) {
      LoggerUtil.info("MINISTRY MODEL --> Nenhum ministério achado");
      return { status: false, data: null };
    }

    LoggerUtil.info("MISTRY MODEL --> Usuários encontrados!");
    return { status: true, data: ministrys };
  }

  async findOne(uuids: string[]): Promise<ResModel> {
    let ministrys: MinistryEntity[] = [];

    for (let uuidKey of uuids) {
      try {
        let ministry: MinistryEntity | null =
          await this.ministryRepository.findOne({ where: { uuid: uuidKey } });

        if (!ministry) {
          throw new Error("Ministério inválido");
        }

        ministrys.push(ministry);
      } catch (e: Error | any) {
        LoggerUtil.error(`MINISTRY MODEL --> Erro: ${e.message}`);
        LoggerUtil.error(`MINISTRY MODEL --> Ministério enviado: ${uuidKey}`);
        return { status: false };
      }
    }

    return { status: true, data: ministrys };
  }
}
