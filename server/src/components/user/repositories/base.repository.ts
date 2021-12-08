import { UserEntity } from "../entities/user.entity";
import { Model } from "mongoose";
import { UserClass } from "../../../database/models/user.model";
import { IUserRepository } from "./interface.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @Inject("USER_MODEL")
        private readonly userModel: Model<UserClass>
    ) {}

    async create(username: string, name: string, phone: string) {
        const user = await this.userModel.create({
            username,
            name,
            phone
        });

        const result = new UserEntity(
            user._id,
            user.username,
            user.name,
            user.phone
        );

        return result;
    }

    async getUser(userId: UniqueId) {
        const result = await this.userModel.findOne({ _id: userId });

        return new UserEntity(result._id, result.username);
    }
}
