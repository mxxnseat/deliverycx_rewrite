import { Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { OrderDTO } from "../dto/order.dto";
import { OrderEntity } from "../entities/order.entity";
import { IOrderRepository } from "../repositores/interface.repository";

@Injectable()
export class OrderUsecase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly orderService: IIiko
    ) {}

    async create(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ) {
        const orderResult = await this.orderService.create(cart, orderInfo);

        const cartPrice = cart.reduce((acc, cartEl) => {
            return acc + cartEl.getPrice * cartEl.getAmount;
        }, 0);

        await this.orderRepository.create(userId, cartPrice);

        if (orderResult instanceof Error) return orderResult;

        return new OrderEntity(orderResult);
    }
}
