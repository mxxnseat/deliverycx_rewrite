import { BaseRepository } from "../../../common/abstracts/base.repository";
import { injectable } from "inversify";
import {
    OrganizationClass,
    OrganizationModel
} from "../../../database/models/organization.model";
import { OrganizationEntity } from "../entities/organization.entity";
import { organizationMapper } from "../entities/organization.mapper";
import { IOrganizationRepository } from "./interface.repository";

@injectable()
export class OrganizationRepository
    extends BaseRepository<OrganizationClass, OrganizationEntity>
    implements IOrganizationRepository
{
    constructor() {
        super(OrganizationModel, organizationMapper, "city", "city");
    }
}
