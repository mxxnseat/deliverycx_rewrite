import { BaseRepository } from "../../../common/abstracts/base.repository";
import { CityClass, CityModel } from "../../../database/models/city.model";
import { CityEntity } from "../entities/city.entity";
import { ICityRepository } from "./interface.repository";
import { cityMapper } from "../entities/city.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CityRepository
    extends BaseRepository<CityClass, CityEntity>
    implements ICityRepository
{
    constructor() {
        super(CityModel, cityMapper, "", "organizations");
    }
}
