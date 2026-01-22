import { IsString, IsUUID } from "class-validator";
import { MemberEntity } from "../../entitys/Member.entity";

export class MinistryDTO {
  @IsString()
  name: string;

  @IsUUID()
  lead_ministry: string | MemberEntity;

  @IsString()
  branch: string;
}
