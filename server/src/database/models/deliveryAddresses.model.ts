import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    mongoose,
    prop,
    Ref
} from "@typegoose/typegoose";
import { UserClass } from "./user.model";

@ModelOptions({
    options: { customName: "DeliveredAddress" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class DeliveredAddressClass {
    @prop({ type: mongoose.Types.ObjectId })
    public _id!: UniqueId;

    @prop({ type: String, default: "Домашний адрес", required: true })
    public name: string;

    @prop({ ref: "User" })
    public user!: Ref<UserClass>;

    @prop({ type: String })
    public city: string;

    @prop({ type: String })
    public address: string;
}

export const DeliveredAddressSchema = buildSchema(DeliveredAddressClass);
export const DeliveredAddressModel = getModelForClass(DeliveredAddressClass);
