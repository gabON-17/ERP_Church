import { MinistryEntity } from "../entitys/Ministry.entity";
import { MinistryRepository } from "../model/ministry.model";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { ResModel } from "../utils/types/ResModel";

export class MinistryService {
  constructor(private readonly ministryRepository: MinistryRepository) {}

  async create(dto: MinistryDTO): Promise<boolean> {
    LoggerUtil.info("MINISTRY SERVICE --> Acessando o MODEL...");
    const repositoryResponse: ResModel = await this.ministryRepository.create(
      dto
    );

    repositoryResponse.status
      ? LoggerUtil.debug(`MINISTRY SERVICE --> Usuário cadastrado!`)
      : LoggerUtil.error("MINISTRY SERVICE --> Error ao cadastrar o usuário");

    return repositoryResponse.status;
  }

  async findAll(): Promise<MinistryEntity[] | null> {
    const repositoryResponse: ResModel =
      await this.ministryRepository.findAll();

    if (!repositoryResponse.status) {
      return null;
    }

    return repositoryResponse.data;
  }
}
