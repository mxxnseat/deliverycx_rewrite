import { BaseRepository } from "../../../common/abstracts/base.repository";
import { OrganizationClass } from "../../../database/models/organization.model";
import { OrganizationEntity } from "../entities/organization.entity";
import { organizationMapper } from "../entities/organization.mapper";
import { IOrganizationRepository } from "./interface.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CityClass } from "src/database/models/city.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OrganizationRepository
    extends BaseRepository<Array<OrganizationClass>, Array<OrganizationEntity>>
    implements IOrganizationRepository
{
    constructor(
        @Inject("Organization")
        private readonly OrganizationModel: Model<OrganizationClass>
    ) {
        super(OrganizationModel, organizationMapper, "city", "city");
    }

    async getOneByGUID(id: UniqueId): Promise<OrganizationEntity> {
        const organizationDoc = await this.OrganizationModel.findOne({ id });
        const organizationEntity = new OrganizationEntity(
            organizationDoc._id,
            organizationDoc.address.street,
            (organizationDoc.city as CityClass)?.name,
            [
                organizationDoc.address.latitude,
                organizationDoc.address.longitude
            ],
            organizationDoc.phone,
            organizationDoc.workTime,
            !!organizationDoc.yopay?.isActive
        );

        return organizationEntity;
    }
}
