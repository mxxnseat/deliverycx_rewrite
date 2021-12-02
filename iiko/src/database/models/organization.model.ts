import {
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
        street?: string;
        home?: string;
        latitude?: number;
        longitude?: number;
    };

    @prop({ type: () => String })
    public phone!: string;

    @prop({ type: () => Number })
    public revision!: number;
}

export const OrganizationModel = getModelForClass(OrganizationClass);
