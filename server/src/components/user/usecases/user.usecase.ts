import { inject, injectable } from "inversify";
import { TYPES } from "../../../ioc/types.ioc";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../repositories/interface.repository";

@injectable()
export class UserUsecase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository
    ) {}

    async create(
        username: string,
        name?: string,
        phone?: string,
        address?: string
    ) {
        if (!username) {
            return "Введите имя пользователя";
        }
        const entity = new UserEntity(username, name, phone, address);

        return await this.userRepository.create(entity);
    }
}
