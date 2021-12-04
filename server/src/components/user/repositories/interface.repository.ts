import { UserEntity } from "../entities/user.entity";

export abstract class IUserRepository {
    abstract create(
        username: string,
        name: string,
        phone: string
    ): Promise<UserEntity>;
}
