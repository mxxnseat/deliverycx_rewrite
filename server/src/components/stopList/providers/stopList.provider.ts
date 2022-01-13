import { Connection } from "mongoose";
import { StopListSchema } from "src/database/models/stopList.model";

export const stopListProviders = [
    {
        provide: "STOP_LIST_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("stopList", StopListSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
