import { Connection } from "mongoose";
import { OrderSchema } from "src/database/models/order.model";

export const orderProviders = [
    {
        inject: ["DATABASE_CONNECTION"],
        useFactory: (connection: Connection) =>
            connection.model("order", OrderSchema),
        provide: "ORDER_MODEL"
    }
];
