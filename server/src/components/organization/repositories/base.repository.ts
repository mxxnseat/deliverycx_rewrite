import { BaseRepository } from "../../../common/abstracts/base.repository";
import {
    OrganizationClass,
    OrganizationModel
} from "../../../database/models/organization.model";
import { OrganizationEntity } from "../entities/organization.entity";
import { organizationMapper } from "../entities/organization.mapper";
import { IOrganizationRepository } from "./interface.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrganizationRepository
    extends BaseRepository<OrganizationClass, OrganizationEntity>
    implements IOrganizationRepository
{
    constructor() {
        super(OrganizationModel, organizationMapper, "city", "city");
    }
}
