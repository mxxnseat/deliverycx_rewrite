import { BaseRepository } from "../../../common/abstracts/base.repository";
import { CartClass, CartModel } from "../../../database/models/cart.model";
import { ProductClass } from "../../../database/models/product.model";
import { CartEntity } from "../entities/cart.entity";
import { cartMapper } from "../entities/cart.mapper";
import { ICartRepository } from "./interface.repository";

export class CartRepository
    extends BaseRepository<CartClass, CartEntity>
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
            result._id,
            product.name,
            product.image,
            result.amount,
            product.price
        );
    }

    async removeAll(userId: UniqueId) {
        await CartModel.findOneAndUpdate(
            {
                user: userId
            },
            {
                $set: {
                    products: []
                }
            },
            { new: true }
        );

        return [] as [];
    }

    async removeOne(userId: UniqueId, cartId: UniqueId) {
        await CartModel.findOneAndUpdate(
            {
                user: userId
            },
            {
                $pull: {
                    products: cartId
                }
            },
            { new: true }
        );

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
        );

        return result!.amount;
    }
}
