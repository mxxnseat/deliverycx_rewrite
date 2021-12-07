import { DocumentType } from "@typegoose/typegoose";
import { CartClass } from "../../../database/models/cart.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { CartEntity } from "./cart.entity";
import { ProductClass } from "../../../database/models/product.model";

export const cartMapper: Mapper<CartClass, Array<CartEntity>> = (p) => {
    return p.map((cart) => {
        const product = cart.product as ProductClass;

        return new CartEntity(
            cart._id,
            product.name,
            product.image,
            product.id,
            cart.amount,
            product.price
        );
    });
};
