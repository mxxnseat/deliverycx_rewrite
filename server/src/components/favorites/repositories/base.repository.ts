import { Inject, Injectable } from "@nestjs/common";
import { IFavoriteRepository } from "./interface.repository";
import { Model } from "mongoose";
import { FavoriteClass } from "src/database/models/favorite.model";
import { Ref } from "@typegoose/typegoose";
import { FavoriteEntity } from "../entities/favorite.entity";

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
    constructor(
        @Inject("FAVORITE_MODEL")
        private readonly favoriteModel: Model<FavoriteClass>
    ) {}

    async add_remove(productId: UniqueId, userId: UniqueId) {
        let action: any = {};

        const isFind = await this.favoriteModel.findOne({
            $and: [
                { user: userId },
                { products: { $in: productId as Ref<any> } }
            ]
        });

        if (isFind) {
            action.$pull = {
                products: productId
            };
        } else {
            action.$push = {
                products: productId
            };
        }

        await this.favoriteModel.findOneAndUpdate(
            { user: userId },
            {
                $setOnInsert: {
                    user: userId
                },
                ...action
            },
            { upsert: true, new: true }
        );

        return new FavoriteEntity(productId, !isFind);
    }
}
