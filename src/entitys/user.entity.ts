import { address } from "../utils/types/address.type";

export class UserEntity {
  id: string;
  full_name: string;
  social_name: string;
  date_birth: Date;
  sex: "M" | "F";
  telephone: number;
  email: string;
  address: address;
}
