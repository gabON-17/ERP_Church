import { UserEntity } from "./user.entity";

export class MemberEntity extends UserEntity {
  ministry: string;
  status: "Ativo" | "Desligado";
  presence: number;
  date_baptism: Date;
}
