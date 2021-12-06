import { Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { CustomerDTO } from "../dto/customer.dto";
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
        customerInfo: CustomerDTO
    ) {
        const orderNumber = await this.orderService.create();

        const cartPrice = cart.reduce((acc, cartEl) => {
            return acc + cartEl.getPrice * cartEl.getAmount;
        }, 0);
        await this.orderRepository.create(userId, cartPrice);

        return new OrderEntity(orderNumber);
    }
}
