import { DataSource, Repository } from "typeorm";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { InternalRes } from "../utils/types/internalRes";
import { LoggerUtil } from "../utils/logger/Logger.util";

import { MemberEntity } from "../entitys/Member.entity";

export class MinistryModel {
  constructor(
    private readonly dataSource: DataSource,
    private readonly ministryRepository: Repository<MinistryEntity> = dataSource.getRepository(MinistryEntity),
  ) {}

  async create(ministryDTO: MinistryDTO): Promise<InternalRes> {
    try {
      if (!(ministryDTO.lead_ministry instanceof MemberEntity)) {
        throw Error("Ministro inválido (espera-se uma instância de MemberEntity)")
      }
    
    const ministry: MinistryEntity = {
      uuid: crypto.randomUUID(),
      name: ministryDTO.name,
      lead_ministry: ministryDTO.lead_ministry,
      members: [ministryDTO.lead_ministry],
      branch: ministryDTO.branch,
    };
      await this.ministryRepository.save(ministry);
      return { status: true };
    } catch (e: any) {
      LoggerUtil.error(`MINISTRY MODEL --> Error ao salvar o ministério: ${e}`);
      return { status: false, error: e };
    }
  }

  async findAll(): Promise<InternalRes> {
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
      return { status: false, error: new Error("Nenhum ministério encontrado") };
    }

    LoggerUtil.info("MISTRY MODEL --> Ministérios encontrados!");
    return { status: true, data: ministrys };
  }

  async findMinistrys(uuids: string[]): Promise<InternalRes> {
    let ministrys: MinistryEntity[] = [];

    for (let uuidKey of uuids) {
      try {
        let ministry: MinistryEntity[] | null =
          await this.ministryRepository.find({
            where: { uuid: uuidKey },
          });

        if (!ministry) {
          throw new Error("Ministério inválido");
        }

        ministrys.push(ministry[0]);
      } catch (e: Error | any) {
        LoggerUtil.error(`MINISTRY MODEL --> Erro: ${e.message}`);
        LoggerUtil.error(`MINISTRY MODEL --> Ministério enviado: ${uuidKey}`);
        return { status: false, error: e.message };
      }
    }

    return { status: true, data: ministrys };
  }
}
