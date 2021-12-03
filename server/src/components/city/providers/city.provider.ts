import { Connection } from "mongoose";
import { CitySchema } from "../../../database/models/city.model";

export const cityProviders = [
    {
        provide: "CITY_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("city", CitySchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
