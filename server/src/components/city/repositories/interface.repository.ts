import { CityEntity } from "../entities/city.entity";

export abstract class ICityRepository {
    abstract getAll(): Promise<Array<CityEntity>>;
}
