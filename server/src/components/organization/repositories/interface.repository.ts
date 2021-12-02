import { OrganizationEntity } from "../entities/organization.entity";

export interface IOrganizationRepository {
    getAll: (cityId: UniqueId) => Promise<Array<OrganizationEntity>>;
}
