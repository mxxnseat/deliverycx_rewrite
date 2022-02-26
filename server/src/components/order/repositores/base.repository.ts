import { Inject, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { CartClass } from "src/database/models/cart.model";
import { OrderClass } from "src/database/models/order.model";
import { OrderDTO } from "../dto/order.dto";
import { orderDeliveredMapper } from "../entities/orderDelivered/orderDelivered.mapper";
import {
    IOrderInfo,
    IOrderItem,
    IOrderRepository
} from "./interface.repository";

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
        orderInfo: IOrderInfo,
        deliveryPrice: number
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
                        orderNum: orderNumber,
                        deliveryPrice: deliveryPrice
                    }
                }
            },
            { upsert: true }
        );
    }

    async getOrders(user: UniqueId, page: number = 0) {
        const ordersDoc = await this.orderModel.aggregate([
            {
                $match: { user: new Types.ObjectId(user) }
            },
            {
                $unwind: "$orders"
            },
            {
                $project: {
                    orders: 1,
                    _id: 0
                }
            },
            {
                $lookup: {
                    from: "products",
                    as: "products",
                    let: {
                        productGUID: "$orders.items.product",
                        amount: "$orders.items.amount"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$id", "$$productGUID"]
                                }
                            }
                        },
                        {
                            $addFields: {
                                amount: { $arrayElemAt: ["$$amount", 0] }
                            }
                        }
                    ]
                }
            },
            {
                $set: {
                    "orders.items": "$products"
                }
            },
            {
                $unset: "products"
            }
        ]);

        return orderDeliveredMapper(ordersDoc);
    }
}
