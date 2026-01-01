import { UserEntity } from "../entitys/user.entity";

export class UsersRepository {
  private id: number = 0;
  private users_list: UserEntity[];

  create(user: UserEntity) {
    this.users_list.push(user);
  }
}
