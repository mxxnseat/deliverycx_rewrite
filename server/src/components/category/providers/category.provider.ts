import { Connection } from "mongoose";
import { CategorySchema } from "../../../database/models/category.model";

export const categoryProviders = [
    {
        provide: "CATEGORY_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("category", CategorySchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
