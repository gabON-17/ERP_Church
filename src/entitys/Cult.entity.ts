import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cults" })
export class CultEntity {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  cult_name: string;

  @Column()
  theme: string;

  @Column()
  cult_date: Date;

  @Column()
  preacher: string;
}
