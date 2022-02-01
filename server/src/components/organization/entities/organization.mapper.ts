import { CityClass } from "../../../database/models/city.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { OrganizationEntity } from "./organization.entity";
import { OrganizationClass } from "../../../database/models/organization.model";

export const organizationMapper: Mapper<
    Array<OrganizationClass>,
    Array<OrganizationEntity>
> = (p) => {
    return p.map((organization) => {
        const address = `${organization.address.street}, ${organization.address.home}`;

        return new OrganizationEntity(
            organization._id,
            address,
            (organization.city as CityClass)?.name,
            [organization.address.latitude, organization.address.longitude],
            organization.phone,
            organization.workTime,
            !!organization.yopay?.isActive
        );
    });
};
