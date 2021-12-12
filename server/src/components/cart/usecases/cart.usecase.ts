import { Injectable, Module, Inject } from "@nestjs/common";
import { ICartRepository } from "../repositories/interface.repository";

@Injectable()
export class CartUsecase {
    constructor(private readonly CartRepository: ICartRepository) {}

    async getAll(userId: UniqueId) {
        const result = await this.CartRepository.getAll(userId);

        const totalPrice = await this.CartRepository.calc(userId);
        return {
            cart: result,
            totalPrice
        };
    }

    async add(userId: UniqueId, productId: UniqueId) {
        const result = await this.CartRepository.add(userId, productId);

        const totalPrice = await this.CartRepository.calc(userId);
        return {
            item: result,
            totalPrice
        };
    }

    async removeAll(userId: UniqueId) {
        const result = await this.CartRepository.removeAll(userId);

        return result;
    }

    async removeOne(userId: UniqueId, cartId: UniqueId) {
        const result = await this.CartRepository.removeOne(userId, cartId);

        const totalPrice = await this.CartRepository.calc(userId);
        return {
            deletedId: result,
            totalPrice
        };
    }

    async changeAmount(userId: UniqueId, cartId: UniqueId, value: number) {
        const result = await this.CartRepository.changeAmount(
            userId,
            cartId,
            value
        );

        const totalPrice = await this.CartRepository.calc(userId);
        return {
            amount: result,
            totalPrice
        };
    }
}
