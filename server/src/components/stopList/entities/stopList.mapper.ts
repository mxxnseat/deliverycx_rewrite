import { CityClass } from "../../../database/models/city.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { StopListEntity } from "./stopList.entity";
import { OrganizationClass } from "../../../database/models/organization.model";
import { StopListClass } from "src/database/models/stopList.model";

export const stopListMapper: Mapper<StopListClass, StopListEntity> = (p) => {
    return new StopListEntity(
        p.organization.toString(),
        p.stopList.map((el) => {
            return {
                balance: el.balance,
                productId: el.product._id.toString()
            };
        })
    );
};
