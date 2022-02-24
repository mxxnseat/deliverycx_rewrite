import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { CartClass } from "src/database/models/cart.model";
import { OrderClass } from "src/database/models/order.model";
import { OrderDTO } from "../dto/order.dto";
import { IOrderItem, IOrderRepository } from "./interface.repository";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject("Order")
        private readonly orderModel: Model<OrderClass>
    ) {}

    async create(
        userId: UniqueId,
        cartPrice: number,
        orderNumber: string,
        orderItems: Array<IOrderItem>,
        orderInfo: OrderDTO
    ) {
        await this.orderModel.findOneAndUpdate(
            { user: userId },
            {
                $setOnInsert: {
                    user: userId
                },
                $push: {
                    orders: {
                        items: orderItems,
                        price: cartPrice,
                        organization: orderInfo.organization,
                        address: orderInfo.address,
                        orderNum: orderNumber
                    }
                }
            },
            { upsert: true }
        );
    }
}
