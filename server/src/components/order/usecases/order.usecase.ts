import { Inject, Injectable } from "@nestjs/common";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { OrderDTO } from "../dto/order.dto";
import { OrderEntity } from "../entities/order.entity";
import { RedirectEntity } from "../entities/redirect.entity";
import { IOrderRepository } from "../repositores/interface.repository";
import { IOrderUtilsService } from "../services/order/interface.service";

@Injectable()
export class OrderUsecase {
    constructor(
        @Inject("IIiko")
        private readonly orderService: IIiko,

        private readonly orderRepository: IOrderRepository,
        private readonly cartRepository: ICartRepository,

        private readonly OrderUtilsService: IOrderUtilsService,
        private readonly DeliveryService: IDeliveryService
    ) {}

    async create(userId: UniqueId, orderInfo: OrderDTO) {
        const cart = await this.cartRepository.getAll(userId);

        const orderNumber = await this.orderService.create(
            userId,
            cart,
            orderInfo
        );

        const deliveryPrice = await this.DeliveryService.calculatingPrices(
            userId,
            orderInfo.orderType
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

        const result = await this.orderService.check(userId, cart, orderInfo);

        return result;
    }

    async getOrderNumber(hash: string) {
        return await this.OrderUtilsService.getOrderNumber(hash);
    }
}
