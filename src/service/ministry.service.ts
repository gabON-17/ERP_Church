import { min } from "class-validator";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { MinistryModel } from "../model/ministry.model";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { ResModel } from "../utils/types/ResModel";

export class MinistryService {
  constructor(private readonly ministryModel: MinistryModel) {}

  async create(dto: MinistryDTO): Promise<boolean> {
    LoggerUtil.info("MINISTRY SERVICE --> Acessando o MODEL...");
    const repositoryResponse: ResModel = await this.ministryModel.create(dto);

    repositoryResponse.status
      ? LoggerUtil.debug(`MINISTRY SERVICE --> Ministério cadastrado!`)
      : LoggerUtil.error(
          "MINISTRY SERVICE --> Error ao cadastrar o ministério"
        );

    return repositoryResponse.status;
  }

  async findAll(): Promise<MinistryEntity[] | null> {
    const repositoryResponse: ResModel = await this.ministryModel.findAll();

    if (!repositoryResponse.status) {
      return null;
    }

    return repositoryResponse.data;
  }

  async findOne(uuid: string): Promise<MinistryEntity[] | null> {
    const resModel: ResModel = await this.ministryModel.findMinistrys([uuid]);
    let ministry: MinistryEntity[] | null;

    resModel.status ? (ministry = [resModel.data]) : (ministry = null);

    return ministry;
  }
}
