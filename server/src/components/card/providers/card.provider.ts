import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { CardModel, CardSchema } from "src/database/models/card.model";

export const cardProviders = [
    {
        provide: "Card",
        useFactory: (connection: Connection) =>
            connection.model("Card", CardSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    }
];
