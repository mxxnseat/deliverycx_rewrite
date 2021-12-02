import { inject, injectable } from "inversify";
import { TYPES } from "../../../ioc/types.ioc";
import { IOrganizationRepository } from "../repositories/interface.repository";

@injectable()
export class OrganizationUsecase {
    constructor(
        @inject(TYPES.OrganizationRepository)
        private readonly organizationRepository: IOrganizationRepository
    ) {}

    async getAll(cityId: UniqueId) {
        const result = await this.organizationRepository.getAll(cityId);

        return result;
    }
}
