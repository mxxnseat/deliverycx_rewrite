import {
    buildSchema,
    getModelForClass,
    ModelOptions,
    prop,
    Ref,
    Severity
} from "@typegoose/typegoose";
import { CityClass } from "./city.model";

@ModelOptions({
    options: { customName: "Organization", allowMixed: Severity.ALLOW },
    schemaOptions: { versionKey: false, timestamps: true }
})
export class OrganizationClass {
    @prop()
    public id!: UniqueId;

    @prop({ ref: "City" })
    public city!: Ref<CityClass>;

    @prop({ type: () => Object })
    public address!: {
        street: string;
        home: number;
        latitude: number;
        longitude: number;
    };

    @prop()
    public phone!: string;
}

export const OrganizationSchema = buildSchema(OrganizationClass);
export const OrganizationModel = getModelForClass(OrganizationClass);
