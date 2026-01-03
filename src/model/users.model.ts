import { UserEntity } from "../entitys/user.entity";
import { logger } from "../logger/logger.config";
import { UserDTO } from "../utils/dtos/user.dto";

export class UsersRepository {
  private id: number = 0;
  private users_list: Array<UserEntity> = [];

  async create(user: UserDTO): Promise<void | unknown> {
    try {
      let newUser: UserEntity | void = {
        id: `${this.id}`,
        ...user,
      };

      if (typeof newUser == "undefined") {
        throw new Error("Usuário indefinido, não é possível criar");
      }

      this.users_list.push(newUser);
      this.id++;

      logger.info("Usuario CRIADO");
    } catch (e) {
      logger.error("Ocorreu um error na criação do usuário");
      logger.debug("Retornando o ERROR para o SERVICE");

      return e;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users_list;
  }
}

export const userRepository = new UsersRepository();
