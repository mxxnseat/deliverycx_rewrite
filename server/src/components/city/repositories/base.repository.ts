import { BaseRepository } from "../../../common/abstracts/base.repository";
import { CityClass, CityModel } from "../../../database/models/city.model";
import { CityEntity } from "../entities/city.entity";
import { ICityRepository } from "./interface.repository";
import { cityMapper } from "../entities/city.mapper";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class CityRepository implements ICityRepository {
    constructor(
        @Inject("CITY_MODEL")
        private readonly cityModel: Model<CityClass>
    ) {}

    async getAll(searchString: string) {
        const result = await this.cityModel
            .find({
                name: {
                    $regex: searchString,
                    $options: "i"
                }
            })
            .populate("organizations");

        return cityMapper(result);
    }
}
