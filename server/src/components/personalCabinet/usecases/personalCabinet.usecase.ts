import { Injectable } from "@nestjs/common";
import { IPersonalCabinetRepository } from "../repositories/interface.repository";

@Injectable()
export class PersonalCabinetUsecase {
    constructor(private readonly orderRepository: IPersonalCabinetRepository) {}

    async getAddresses(userId: UniqueId) {
        const result = await this.orderRepository.getAddresses(userId);

        return result;
    }

    async getOrders(user: UniqueId, page: number = 0) {
        const result = await this.orderRepository.getOrders(user, page);

        return result;
    }
}
