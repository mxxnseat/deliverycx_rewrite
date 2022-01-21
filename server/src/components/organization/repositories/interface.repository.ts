import { OrganizationEntity } from "../entities/organization.entity";

export abstract class IOrganizationRepository {
    abstract getAll(cityId: UniqueId): Promise<Array<OrganizationEntity>>;
    abstract getOneByGUID(id: UniqueId): Promise<OrganizationEntity>;
}
