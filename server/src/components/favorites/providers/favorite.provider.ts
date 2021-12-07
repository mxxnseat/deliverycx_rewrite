import { FavoriteSchema } from "src/database/models/favorite.model";
import { Connection } from "mongoose";

export const favoriteProviders = [
    {
        inject: ["DATABASE_CONNECTION"],
        useFactory: (connection: Connection) =>
            connection.model("favorite", FavoriteSchema),
        provide: "FAVORITE_MODEL"
    }
];
