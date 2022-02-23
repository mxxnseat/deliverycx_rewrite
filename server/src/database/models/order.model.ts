import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    prop,
    Ref
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ProductClass } from "./product.model";
import { UserClass } from "./user.model";

class NestedItemClass {
    @prop()
    product: UniqueId;
}

class NestedOrderClass {
    @prop({ type: NestedItemClass, default: [], required: true })
    items: [NestedItemClass];

    @prop({ type: Number })
    price!: number;
    @prop({ type: String })
    orderNum!: string;
}

@ModelOptions({
    options: { customName: "Order" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class OrderClass {
    @prop({ ref: "User", type: Types.ObjectId })
    user!: Ref<UserClass>;

    @prop({ required: true, default: [], type: NestedOrderClass })
    orders!: [NestedOrderClass];
}

export const OrderSchema = buildSchema(OrderClass);

export const OrderModel = getModelForClass(OrderClass);
