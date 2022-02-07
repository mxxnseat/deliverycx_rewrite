import { CityClass } from "../../../database/models/city.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { CityEntity } from "./city.entity";

export const cityMapper: Mapper<Array<CityClass>, Array<CityEntity>> = (p) => {
    console.log(p);

    return (
        p
            // .filter((city) => city.organizations.length)
            .map((city) => {
                return new CityEntity(city._id, city.name);
            })
    );
};
