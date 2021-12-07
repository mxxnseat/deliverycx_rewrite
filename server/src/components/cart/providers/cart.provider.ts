import { Connection } from "mongoose";
import { CartSchema } from "../../../database/models/cart.model";

export const cartProviders = [
    {
        provide: "CART_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("cart", CartSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
