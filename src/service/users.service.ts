import { UserEntity } from "../entitys/user.entity";
import { logger } from "../logger/logger.config";
import { userRepository, UsersRepository } from "../model/users.model";
import { UserDTO } from "../utils/dtos/user.dto";

export class UsersService {
  constructor(readonly usersRepositoty: UsersRepository) {}

  async create(userDTO: UserDTO): Promise<void | unknown> {
    logger.info("Criando o usuário...");

    const repositoryResponse: void | unknown =
      await this.usersRepositoty.create(userDTO);

    if (repositoryResponse) {
      return repositoryResponse;
    }

    return;
  }

  async findAll(): Promise<UserEntity[] | undefined> {
    logger.info("Consultando banco...");
    const users: UserEntity[] | undefined =
      await this.usersRepositoty.findAll();

    return users;
  }
}
