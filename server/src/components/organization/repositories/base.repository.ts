import { BaseRepository } from "../../../common/abstracts/base.repository";
import { OrganizationClass } from "../../../database/models/organization.model";
import { OrganizationEntity } from "../entities/organization.entity";
import { organizationMapper } from "../entities/organization.mapper";
import { IOrganizationRepository } from "./interface.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CityClass } from "src/database/models/city.model";
import { Model } from "mongoose";
import { PaymentServiceDataClass } from "src/database/models/payment.model";
import { PaymentInfoEntity } from "../entities/payments.entity";

@Injectable()
export class OrganizationRepository
    extends BaseRepository<Array<OrganizationClass>, Array<OrganizationEntity>>
    implements IOrganizationRepository
{
    constructor(
        @Inject("Organization")
        private readonly OrganizationModel: Model<OrganizationClass>,

        @Inject("PaymentServiceData")
        private readonly PaymentServiceDataModel: Model<PaymentServiceDataClass>
    ) {
        super(OrganizationModel, organizationMapper, "city", "city");
    }

    public async getOneByGUID(id: UniqueId): Promise<OrganizationEntity> {
        const organizationDoc = await this.OrganizationModel.findOne({ id });
        const organizationEntity = new OrganizationEntity(
            organizationDoc._id,
            `${organizationDoc.address.street}, ${organizationDoc.address.home}`,
            (organizationDoc.city as CityClass)?.name,
            [
                organizationDoc.address.latitude,
                organizationDoc.address.longitude
            ],
            organizationDoc.phone,
            organizationDoc.workTime
        );

        return organizationEntity;
    }

    public async getPaymentsInfo(organizationId: UniqueId) {
        const paymentDoc = await this.PaymentServiceDataModel.findById(
            organizationId
        );

        return new PaymentInfoEntity(
            paymentDoc?.merchantId,
            paymentDoc?.token,
            paymentDoc?.isActive
        );
    }
}
