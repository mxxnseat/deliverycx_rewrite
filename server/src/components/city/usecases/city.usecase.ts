import { IOrganizationRepository } from "../../organization/repositories/interface.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../ioc/types.ioc";
import { ICityRepository } from "../repositories/interface.repository";

@injectable()
export class CityUsecase {
    constructor(
        @inject(TYPES.CityRepository)
        private readonly cityRepository: ICityRepository,

        @inject(TYPES.OrganizationRepository)
        private readonly organizationRepository: IOrganizationRepository
    ) {}

    async getAll() {
        const result = await this.cityRepository.getAll();

        return result;
    }
}
