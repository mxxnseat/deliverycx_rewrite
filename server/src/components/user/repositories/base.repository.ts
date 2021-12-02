import { UserEntity } from "../entities/user.entity";

import { injectable } from "inversify";
import { UserModel } from "../../../database/models/user.model";
import { IUserRepository } from "./interface.repository";

@injectable()
export class UserRepository implements IUserRepository {
    constructor() {}

    async create(item: UserEntity) {
        await UserModel.create(item);

        return item;
    }
}
