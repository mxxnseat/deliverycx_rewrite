import { Injectable } from "@nestjs/common";
import { IFavoriteRepository } from "src/components/favorites/repositories/interface.repository";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { UserEntity } from "../entities/user.entity";
import { IUpdateProps } from "../interfaces/update.interface";
import { IUserRepository } from "../repositories/interface.repository";
import { IGuestGenerateService } from "../services/guestUsername.stub";

@Injectable()
export class UserUsecase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly favoriteRepository: IFavoriteRepository,
        private readonly generateUsernameService: IGuestGenerateService
    ) {}

    async create(user?: UniqueId, phone?: string) {
        const userEntity = await this.userRepository.getUser({ phone });
        console.log(userEntity, userEntity.check());
        if (userEntity.check()) {
            return userEntity;
        }

        const username = await this.generateUsernameService.generate();

        return await this.userRepository.create(username, username, phone);
    }

    async createGuest() {
        const username = await this.generateUsernameService.generate();

        return await this.userRepository.create(username, username, "");
    }

    async getUser(userId: UniqueId) {
        return await this.userRepository.getUser({ _id: userId });
    }

    async updateUser(userId: UniqueId, updateProps: IUpdateProps) {
        const user = await this.userRepository.updateUser(userId, updateProps);

        if (
            updateProps.organizationId &&
            user.getOrganization !== updateProps.organizationId
        ) {
            await this.favoriteRepository.clear(userId);
        }
    }
}
