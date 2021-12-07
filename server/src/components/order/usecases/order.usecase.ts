import { Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { OrderDTO } from "../dto/order.dto";
import { OrderEntity } from "../entities/order.entity";
import { IOrderRepository } from "../repositores/interface.repository";
import { ValidationCount } from "../services/validationCount/validationCount.service";

@Injectable()
export class OrderUsecase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly orderService: IIiko,
        private readonly validationCountService: ValidationCount
    ) {}

    async create(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ) {
        this.validationCountService.validate(cart);

        const orderResult = await this.orderService.create(cart, orderInfo);

        await this.orderRepository.create(userId, CartEntity.calc(cart));

        return new OrderEntity(orderResult);
    }
}
