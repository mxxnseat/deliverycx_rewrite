import { Injectable } from "@nestjs/common";
import { IOrganizationRepository } from "../repositories/interface.repository";

@Injectable()
export class OrganizationUsecase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository
    ) {}

    async getAll(cityId: UniqueId) {
        const result = await this.organizationRepository.getAll(cityId);

        return result;
    }

    async getRecvisites(organizationId: UniqueId) {
        const result = await this.organizationRepository.getRecvisites(
            organizationId
        );

        return result;
    }
}
