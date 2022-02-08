import { OrganizationEntity } from "../entities/organization.entity";
import { RecvisitesEntity } from "../entities/recvisites.entity";

export abstract class IOrganizationRepository {
    abstract getAll(cityId: UniqueId): Promise<Array<OrganizationEntity>>;
    abstract getOneByGUID(id: UniqueId): Promise<OrganizationEntity>;
    abstract getRecvisites(organizationId: UniqueId): Promise<RecvisitesEntity>;
}
