import { UUID } from "node:crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { MemberEntity } from "./Member.entity";

@Entity({ name: "teths" })
export class TenthEntity {
  @PrimaryColumn()
  uuid?: UUID;

  @OneToOne(() => MemberEntity, (member) => member.uuid)
  member: string;

  @Column()
  value: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  creatAt?: Date;
}
