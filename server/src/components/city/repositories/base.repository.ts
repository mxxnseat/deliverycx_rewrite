import { BaseRepository } from "../../../common/abstracts/base.repository";
import { injectable } from "inversify";
import { CityClass, CityModel } from "../../../database/models/city.model";
import { CityEntity } from "../entities/city.entity";
import { ICityRepository } from "./interface.repository";
import { cityMapper } from "../entities/city.mapper";

@injectable()
export class CityRepository
    extends BaseRepository<CityClass, CityEntity>
    implements ICityRepository
{
    constructor() {
        super(CityModel, cityMapper, "", "organizations");
    }
}
