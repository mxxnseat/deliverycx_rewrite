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

        const address =
            user?.address && `${user?.address.street} ${user?.address.home}`;

        return new UserEntity(
            user?._id,
            user?.username,
            user?.name,
            user?.phone,
            address,
            null,
            user?.email || null
        );
    }

    async getUser(findProps: IFindProps) {
        const user = await this.userModel.findOne({
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
            user?._id,
            user?.username,
            user?.name,
            user?.phone,
            null,
            user?.selectedOrganization?.toString() || null,
            user?.email
        );
    }

    async updateUser(userId: UniqueId, updateProps: IUpdateProps) {
        const user = await this.userModel.findByIdAndUpdate(userId, {
            selectedOrganization: updateProps.organizationId,
            ...updateProps
        });

        return new UserEntity(
            user?._id,
            user?.username,
            user?.name,
            user?.phone,
            null,
            user?.selectedOrganization?.toString() || null,
            user?.email
        );
    }
}
