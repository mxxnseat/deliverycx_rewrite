import { UserEntity } from "../entities/user.entity";
import { IUpdateProps } from "../interfaces/update.interface";

export interface IFindProps {
    _id?: UniqueId;
    phone?: string;
    username?: string;
}

export abstract class IUserRepository {
    abstract create(
        username: string,
        name: string,
        phone: string
    ): Promise<UserEntity>;

    abstract getUser(findProps: IFindProps): Promise<UserEntity>;

    abstract updateUser(
        userId: UniqueId,
        updateProps: IUpdateProps
    ): Promise<UserEntity>;
}
