import { Inject } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { DeliveredAddressClass } from "src/database/models/deliveryAddresses.model";
import { deliveredAddressMapper } from "../entities/addresses/deliveredAddresses.mapper";
import { orderDeliveredMapper } from "../entities/orderDelivered/orderDelivered.mapper";
import { PersonalCabinetEnum } from "../providers/constants";
import { IPutAddress } from "./interface.repository";

export class PersonalCabinetRepository {
    constructor(
        @Inject(PersonalCabinetEnum.DELIVERED_ADDRESS)
        private readonly deliveredAddressModel: Model<DeliveredAddressClass>,

        @Inject(PersonalCabinetEnum.ORDER)
        private readonly orderModel: Model<DeliveredAddressClass>
    ) {}

    async putAddress(user: UniqueId, address: IPutAddress) {
        const result = await this.deliveredAddressModel
            .findOneAndUpdate(
                { user, address: address.address },
                {
                    $setOnInsert: {
                        user,
                        address: address.address,
                        city: address.city
                    }
                },
                { new: true }
            )
            .lean();

        const id = result._id;

        return id;
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

    async getAddresses(user: UniqueId) {
        const result = await this.deliveredAddressModel.find({ user });

        return deliveredAddressMapper(result);
    }
}
