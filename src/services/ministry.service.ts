import { min } from "class-validator";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { MinistryModel } from "../models/ministry.model";
import { MinistryDTO } from "../utils/dtos/ministry.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../utils/types/internalRes";
import { MembersModel } from "../models/members.model";
import { MemberEntity } from "../entitys/Member.entity";

export class MinistryService {
  constructor(
    private readonly ministryModel: MinistryModel,
    private readonly memberModel: MembersModel
  ) {}

  async create(dto: MinistryDTO): Promise<InternalRes> {

    if (typeof dto.lead_ministry !== "string") return { status: false, error: new Error("Líder de ministério inválido (espera-se uma string)") }

    const member_lead: InternalRes = await this.memberModel.findOne(dto.lead_ministry)

    if (!member_lead.status) {
      return { status: false, error: member_lead.error }
    } 
    dto.lead_ministry = member_lead.data  

    LoggerUtil.info("MINISTRY SERVICE --> Acessando o MINISTRY MODEL...");
    const repositoryResponse: InternalRes = await this.ministryModel.create(dto);

    repositoryResponse.status
      ? LoggerUtil.debug(`MINISTRY SERVICE --> Ministério cadastrado!`)
      : LoggerUtil.error(
          "MINISTRY SERVICE --> Error ao cadastrar o ministério"
        );

    return { status: repositoryResponse.status };
  }

  async findAll(): Promise<InternalRes> {
    const repositoryResponse: InternalRes = await this.ministryModel.findAll();

    if (!repositoryResponse.status) {
      return { status: false, data: null, error: new Error("Nenhum ministério encontrado") };
    }

    return { status: true, data: repositoryResponse.data };
  }

  async findOne(uuid: string): Promise<InternalRes> {
    const resModel: InternalRes = await this.ministryModel.findMinistrys([uuid]);
    let ministry: MinistryEntity | null;

    resModel.status ? (ministry = resModel.data) : (ministry = null);

    return { status: resModel.status, data: ministry };
  }
}
