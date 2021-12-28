import { Injectable, Module, Inject } from "@nestjs/common";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { ICartRepository } from "../repositories/interface.repository";

@Injectable()
export class CartUsecase {
    constructor(
        private readonly CartRepository: ICartRepository,
        private readonly DeliveryService: IDeliveryService
    ) {}

    async getAll(userId: UniqueId) {
        const result = await this.CartRepository.getAll(userId);

        const prices = await this.DeliveryService.calculatingPrices(userId);
        return {
            cart: result,
            ...prices
        };
    }

    async add(userId: UniqueId, productId: UniqueId) {
        const result = await this.CartRepository.add(userId, productId);
        const prices = await this.DeliveryService.calculatingPrices(userId);

        return {
            item: result,
            ...prices
        };
    }

    async removeAll(userId: UniqueId) {
        const result = await this.CartRepository.removeAll(userId);

        return result;
    }

    async removeOne(userId: UniqueId, cartId: UniqueId) {
        const result = await this.CartRepository.removeOne(userId, cartId);
        const prices = await this.DeliveryService.calculatingPrices(userId);

        return {
            deletedId: result,
            ...prices
        };
    }

    async changeAmount(userId: UniqueId, cartId: UniqueId, value: number) {
        const result = await this.CartRepository.changeAmount(
            userId,
            cartId,
            value
        );

        const prices = await this.DeliveryService.calculatingPrices(userId);

        return {
            item: result,
            ...prices
        };
    }
}
