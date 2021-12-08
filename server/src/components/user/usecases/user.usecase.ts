import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../repositories/interface.repository";

@Injectable()
export class UserUsecase {
    constructor(private readonly userRepository: IUserRepository) {}

    async create(
        username: string,
        name?: string,
        phone?: string,
        address?: string
    ) {
        return await this.userRepository.create(username, name, phone);
    }

    async getUser(userId: UniqueId) {
        return await this.userRepository.getUser(userId);
    }
}
