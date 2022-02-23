import { UserEntity } from "../entities/user.entity";
import { Model } from "mongoose";
import { UserClass } from "../../../database/models/user.model";
import { IFindProps, IUserRepository } from "./interface.repository";
import { Inject, Injectable } from "@nestjs/common";
import { IUpdateProps } from "../interfaces/update.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @Inject("User")
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
            user.phone,
            null,
            null
        );

        return result;
    }

    async getUser(findProps: IFindProps) {
        const result = await this.userModel.findOne({
            $or: [
                {
                    _id: findProps._id
                },
                {
                    phone: findProps.phone
                },
                {
                    username: findProps.username
                }
            ]
        });

        return new UserEntity(
            result?._id,
            result?.username,
            result?.name,
            result?.phone,
            null,
            result?.selectedOrganization?.toString() || null
        );
    }

    async updateUser(userId: UniqueId, updateProps: IUpdateProps) {
        const user = await this.userModel.findByIdAndUpdate(userId, {
            selectedOrganization: updateProps.organizationId,
            name: updateProps.name,
            phone: updateProps.phone,
            address: { ...updateProps.address }
        });

        return new UserEntity(
            user._id,
            user.username,
            user.name,
            user.phone,
            null,
            user.selectedOrganization?.toString() || null
        );
    }
}
