import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { MemberEntity } from "./Member.entity";

@Entity({ name: "ministrys" })
export class MinistryEntity {
  @PrimaryColumn()
  uuid?: string;

  @Column()
  name: string;

  @JoinColumn()
  @OneToOne(() => MemberEntity, (member) => member.uuid)
  lead_ministry: string;

  @ManyToMany(() => MemberEntity, (member) => member.ministry)
  members: MemberEntity[];

  @Column()
  branch: string;
}
