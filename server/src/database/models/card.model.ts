import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    mongoose,
    prop,
    Ref
} from "@typegoose/typegoose";
import { ProductClass } from "./product.model";
import { UserClass } from "./user.model";

@ModelOptions({
    options: { customName: "Card" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class CardClass {
    @prop({ type: mongoose.Types.ObjectId })
    public _id!: UniqueId;

    @prop({ ref: "User" })
    public user!: Ref<UserClass>;

    @prop({ type: () => String })
    public number: string;

    @prop({ type: () => Number })
    public cvv: number;

    @prop({ type: () => Object })
    public expires: {
        year: number;
        month: number;
    };

    @prop({ type: () => String, default: "UNKNOWN" })
    public cardholder: string;
}

export const CardSchema = buildSchema(CardClass);
export const CardModel = getModelForClass(CardClass);
