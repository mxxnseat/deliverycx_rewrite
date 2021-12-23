import { Connection } from "mongoose";
import { CardSchema } from "src/database/models/card.model";

export const cardProviders = [
    {
        provide: "CARD_MODEL",
        useFactory: (connection: Connection) =>
            connection.model("card", CardSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];
