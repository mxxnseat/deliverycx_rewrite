import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    create: (item: UserEntity) => Promise<UserEntity>;
}
