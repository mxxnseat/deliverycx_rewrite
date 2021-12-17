import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { CartClass } from "src/database/models/cart.model";
import { OrderClass } from "src/database/models/order.model";
import { IOrderRepository } from "./interface.repository";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject("ORDER_MODEL")
        private readonly orderModel: Model<OrderClass>
    ) {}

    async create(userId: UniqueId, cartPrice: number, orderNumber: string) {
        await this.orderModel.findOneAndUpdate(
            { user: userId },
            {
                $setOnInsert: {
                    user: userId
                },
                $push: {
                    orders: {
                        price: cartPrice,
                        orderNum: orderNumber
                    }
                }
            },
            { upsert: true }
        );
    }
}
