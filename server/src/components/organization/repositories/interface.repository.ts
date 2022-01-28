import { OrganizationEntity } from "../entities/organization.entity";
import { PaymentInfoEntity } from "../entities/payments.entity";

export abstract class IOrganizationRepository {
    abstract getAll(cityId: UniqueId): Promise<Array<OrganizationEntity>>;
    abstract getOneByGUID(id: UniqueId): Promise<OrganizationEntity>;
    abstract getPaymentsInfo(
        organizationId: UniqueId
    ): Promise<PaymentInfoEntity>;
}
