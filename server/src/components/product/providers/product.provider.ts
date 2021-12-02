import { Connection } from "mongoose";
import { ProductSchema } from "../../../database/models/product.model";

export const productProviders = [
    {
        provide: "PRODUCT_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("product", ProductSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
