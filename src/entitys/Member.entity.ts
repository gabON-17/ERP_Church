import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { MinistryEntity } from "./Ministry.entity";

@Entity({ name: "members" })
export class MemberEntity {
  @PrimaryColumn({ primary: true })
  uuid?: string;

  @Column()
  full_name: string;

  @Column()
  social_name: string;

  @Column()
  date_birth: Date;

  @Column()
  sex: "M" | "F";

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: "json" })
  address: string;

  @JoinTable({ name: "member_to_ministry" })
  @ManyToMany(() => MinistryEntity, (ministry) => ministry.members)
  ministry: MinistryEntity[];

  // @Column()
  // tenths: TenthEntity[];

  // @Column()
  // offers: OfferEntity[];

  @Column()
  status?: "Ativo" | "Desligado";

  @Column()
  presence?: number;

  @Column({ type: "date" })
  date_baptism: Date;

  @CreateDateColumn()
  creatAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
