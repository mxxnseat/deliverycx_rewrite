import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { CartClass } from "src/database/models/cart.model";
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
        private readonly validationCountService: ValidationCount,
        private readonly cartRepository: ICartRepository,
        @Inject("CART_MODEL") private readonly cartModel: Model<CartClass>
    ) {}

    async create(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ) {
        this.validationCountService.validate(cart);

        const orderResult = await this.orderService.create(cart, orderInfo);

        await this.orderRepository.create(
            userId,
            await this.cartRepository.calc(userId)
        );

        await this.cartModel.deleteMany({ user: userId });

        return new OrderEntity(orderResult);
    }
}
