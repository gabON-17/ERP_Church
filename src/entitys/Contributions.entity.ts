import { UUID } from "node:crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { MemberEntity } from "./Member.entity";

@Entity({ name: "offers" })
export class ContributionsEntity {
  @PrimaryColumn()
  uuid?: UUID;

  @Column()
  type: "dizimo" | "oferta";

  @JoinColumn()
  @OneToMany(() => MemberEntity, (member) => member.contributions)
  member: MemberEntity;

  @Column()
  value: number;

  @Column()
  date: Date;

  @Column()
  payment_type: string;

  @CreateDateColumn()
  creatAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
