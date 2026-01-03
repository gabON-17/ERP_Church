import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
} from "class-validator";
import { address } from "../types/address.type";

export class UserDTO {
  @IsString()
  full_name: string;

  social_name: string;

  @IsDateString()
  date_birth: Date;

  @IsString()
  sex: "M" | "F";

  @IsNumberString()
  telephone: string;

  @IsEmail()
  email: string;

  address: address;
}
