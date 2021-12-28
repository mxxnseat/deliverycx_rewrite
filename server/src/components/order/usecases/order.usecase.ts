import { Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { OrderDTO } from "../dto/order.dto";
import { OrderEntity } from "../entities/order.entity";
import { IOrderRepository } from "../repositores/interface.repository";

@Injectable()
export class OrderUsecase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly orderService: IIiko,
        private readonly cartRepository: ICartRepository,
        private readonly DeliveryService: IDeliveryService
    ) {}

    async create(userId: UniqueId, orderInfo: OrderDTO) {
        const cart = await this.cartRepository.getAll(userId);

        const orderNumber = await this.orderService.create(cart, orderInfo);

        const deliveryPrice = await this.DeliveryService.calculatingPrices(
            userId
        );

        await this.orderRepository.create(
            userId,
            deliveryPrice.totalPrice,
            orderNumber
        );

        await this.cartRepository.removeAll(userId);

        return new OrderEntity(orderNumber);
    }

    async checkOrder(userId, orderInfo: OrderDTO) {
        const cart = await this.cartRepository.getAll(userId);

        const result = await this.orderService.check(cart, orderInfo);

        return result;
    }
}
