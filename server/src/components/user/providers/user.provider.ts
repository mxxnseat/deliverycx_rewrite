import { Connection } from "mongoose";
import { UserSchema } from "../../../database/models/user.model";

export const userProviders = [
    {
        provide: "USER_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("user", UserSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
