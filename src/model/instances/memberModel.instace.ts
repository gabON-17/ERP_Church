import { MemberEntity } from "../../entitys/Member.entity";
import { AppDataSource } from "../connection/data.config";
import { MembersModel } from "../members.model";
import { ministryModel } from "./ministryModel.instance";

export const memberModel: MembersModel = new MembersModel(
  AppDataSource,
  ministryModel,
  AppDataSource.getRepository(MemberEntity)
);
