import { BaseRepository } from "../../../common/abstracts/base.repository";
import { CartClass, CartModel } from "../../../database/models/cart.model";
import { ProductClass } from "../../../database/models/product.model";
import { CartEntity } from "../entities/cart.entity";
import { cartMapper } from "../entities/cart.mapper";
import { ICartRepository } from "./interface.repository";
import { Types } from "mongoose";

export class CartRepository
    extends BaseRepository<Array<CartClass>, Array<CartEntity>>
    implements ICartRepository
{
    constructor() {
        super(CartModel, cartMapper, "user", "product");
    }

    async add(userId: UniqueId, productId: UniqueId) {
        const result = await CartModel.findOneAndUpdate(
            {
                user: userId,
                product: productId
            },
            {
                $setOnInsert: {
                    product: productId
                },
                $inc: {
                    amount: 1
                }
            },
            { upsert: true, new: true }
        ).populate("product");

        const product = result.product as ProductClass;

        return new CartEntity(
            result?._id,
            product?.name,
            product?.image,
            product?.tags,
            product?.id,
            result?.amount,
            product?.price
        );
    }

    async removeAll(userId: UniqueId) {
        await CartModel.deleteMany({
            user: userId
        });

        return [] as [];
    }

    async removeOne(userId: UniqueId, cartId: UniqueId) {
        await CartModel.deleteOne({
            user: userId,
            _id: cartId
        });

        return cartId;
    }

    async changeAmount(userId: UniqueId, cartId: UniqueId, value: number) {
        const result = await CartModel.findOneAndUpdate(
            {
                user: userId,
                _id: cartId
            },
            {
                $set: {
                    amount: value
                }
            },
            { new: true }
        ).populate("product");

        const product = result.product as ProductClass;

        return new CartEntity(
            result._id,
            product.name,
            product.image,
            product.tags,
            product.id,
            result.amount,
            product.price
        );
    }

    async calc(userId: UniqueId) {
        const calcResult = await CartModel.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $addFields: {
                    firstProduct: {
                        $first: "$product"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: {
                            $multiply: ["$firstProduct.price", "$amount"]
                        }
                    }
                }
            }
        ]);

        return calcResult[0] ? calcResult[0].totalPrice : 0;
    }
}
