import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { DeliveredAddressClass } from "src/database/models/deliveryAddresses.model";
import { OrderClass } from "src/database/models/order.model";
import { OrderProvideEnum } from "../providers/constants";
import {
    IOrderInfo,
    IOrderItem,
    IOrderRepository
} from "./interface.repository";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject(OrderProvideEnum.ORDER)
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
        await this.orderModel
            .updateOne(
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
            )
            .lean();
    }
}
