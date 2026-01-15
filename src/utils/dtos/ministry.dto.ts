import { IsString, IsUUID } from "class-validator";

export class MinistryDTO {
  @IsString()
  name: string;

  @IsUUID()
  lead_ministry: string;

  @IsString()
  branch: string;
}
