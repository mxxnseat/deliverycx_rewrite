import { CityEntity } from "../entities/city.entity";

export interface ICityRepository {
    getAll: () => Promise<Array<CityEntity>>;
}
