import { MinistryEntity } from "../../entitys/Ministry.entity";
import { AppDataSource } from "../connection/data.config";
import { MinistryModel } from "../ministry.model";
import { memberModel } from "./memberModel.instace";

export const ministryModel: MinistryModel = new MinistryModel(
  AppDataSource,
  memberModel,
  AppDataSource.getRepository(MinistryEntity)
);
