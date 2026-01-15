import { DataSource, Repository } from "typeorm";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { ResModel } from "../utils/types/ResModel";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { MembersModel } from "./members.model";

export class MinistryModel {
  constructor(
    private readonly dataSource: DataSource,
    private readonly ministryRepository: Repository<MinistryEntity>,
    private membersModel?: MembersModel
  ) {}

  async create(ministryDTO: MinistryDTO): Promise<ResModel> {
    LoggerUtil.debug(
      "MINISTRY MODEL --> Salvando ministério no banco de dados..."
    );
    LoggerUtil.debug(`MEMBERS MODEL --> ${console.log(this.membersModel)}`);
    let member: ResModel;
    try {
      member = await this.membersModel!.findOne(ministryDTO.lead_ministry);
      if (!member.status) {
        throw new Error("Ministério inválido");
      }
    } catch (e) {
      e instanceof TypeError
        ? LoggerUtil.error(`MINISTRY MODEL --> Error no servidor. Error: ${e}`)
        : LoggerUtil.error(`Error ao cadastrar o ministério. Error: ${e}`);

      return { status: false };
    }

    const ministry: MinistryEntity = {
      uuid: crypto.randomUUID(),
      name: ministryDTO.name,
      lead_ministry: member.data,
      members: [],
      branch: ministryDTO.branch,
    };

    try {
      await this.ministryRepository.save(ministry);
      return { status: true };
    } catch (e: any) {
      LoggerUtil.error(`MINISTRY MODEL --> Error ao salvar o ministério: ${e}`);
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

    LoggerUtil.info("MISTRY MODEL --> Ministérios encontrados!");
    return { status: true, data: ministrys };
  }

  async findMinistrys(uuids: string[]): Promise<ResModel> {
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
        return { status: false };
      }
    }

    return { status: true, data: ministrys };
  }

  public set setMembersModel(model: MembersModel) {
    this.membersModel = model;
  }
}
