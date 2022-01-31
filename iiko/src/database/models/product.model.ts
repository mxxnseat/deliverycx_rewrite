import {
    getModelForClass,
    ModelOptions,
    prop,
    Ref
} from "@typegoose/typegoose";
import { CategoryClass } from "./category.model";
import { OrganizationClass } from "./organization.model";
import { Types } from "mongoose";
import { Decimal128 } from "bson";

enum MeasureUnit {
    PIECE = "шт",
    PORTION = "порц"
}

@ModelOptions({
    options: { customName: "Product" },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class ProductClass {
    @prop({ ref: () => OrganizationClass })
    public organization!: Ref<OrganizationClass>;

    @prop()
    public id!: UniqueId;

    @prop()
    public name!: string;

    @prop()
    public description!: string;

    @prop()
    public tags: string[];

    @prop()
    public additionalInfo!: string;

    @prop()
    public price!: number;

    @prop()
    public weight!: number;

    @prop({ ref: "Category" })
    public category!: Ref<CategoryClass>;

    @prop()
    public image!: ImagePath;

    @prop({ enum: MeasureUnit })
    public measureUnit!: "шт" | "порц";
}

export const ProductModel = getModelForClass(ProductClass);
