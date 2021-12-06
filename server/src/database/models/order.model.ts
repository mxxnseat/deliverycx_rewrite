import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    Prop,
    Ref
} from "@typegoose/typegoose";
import { warnMixed } from "@typegoose/typegoose/lib/internal/utils";
import { Types } from "mongoose";
import { UserClass } from "./user.model";

class NestedOrderClass {
    price!: number;
}

@ModelOptions({
    options: { customName: "Order" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class OrderClass {
    @Prop({ ref: "User", type: Types.ObjectId })
    user!: Ref<UserClass>;

    @Prop({ required: true, default: [], type: warnMixed })
    orders: [NestedOrderClass];
}

export const OrderSchema = buildSchema(OrderClass);

export const OrderModel = getModelForClass(OrderClass);
