import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    prop,
    Ref
} from "@typegoose/typegoose";
import { OrganizationClass } from "./organization.model";
import { ProductClass } from "./product.model";

class NestedStopListClass {
    @prop({ type: String })
    public product: Ref<ProductClass>;
    @prop({ type: Number })
    public balance: number;

    constructor(product: ProductClass, balance: number) {
        this.product = product;
        this.balance = balance;
    }
}

@ModelOptions({
    options: { customName: "StopList" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class StopListClass {
    @prop({ ref: "Organization" })
    organization: Ref<OrganizationClass, UniqueId>;

    @prop({ type: NestedStopListClass })
    stopList: NestedStopListClass[];
}

export const StopListSchema = buildSchema(StopListClass);
export const StopListModel = getModelForClass(StopListClass);
