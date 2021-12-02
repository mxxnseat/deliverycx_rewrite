import { CityClass } from "../../../database/models/city.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { CityEntity } from "./city.entity";

export const cityMapper: Mapper<CityClass, Array<CityEntity>> = (p) => {
    return p
        .filter((city) => city.organizations.length)
        .map((city) => {
            return new CityEntity(city._id, city.name);
        });
};
