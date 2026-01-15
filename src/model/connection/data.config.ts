import { DataSource } from "typeorm";
import { CultEntity } from "../../entitys/Cult.entity";
import { MemberEntity } from "../../entitys/Member.entity";
import { MinistryEntity } from "../../entitys/Ministry.entity";
import { OfferEntity } from "../../entitys/Offer.entity";
import { TenthEntity } from "../../entitys/Tenth.entity";

export const AppDataSource: DataSource = new DataSource({
  type: process.env.TYPE_DB || "postgres",
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [
    CultEntity,
    MemberEntity,
    MinistryEntity,
    OfferEntity,
    TenthEntity,
  ],
});
