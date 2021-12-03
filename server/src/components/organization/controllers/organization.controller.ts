import { Controller, Get, Query } from "@nestjs/common";
import { OrganizationUsecase } from "../usecases/organization.usecase";

@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationUsecase: OrganizationUsecase) {}

    @Get("all")
    async getAll(@Query("cityId") cityId: UniqueId) {
        const result = await this.organizationUsecase.getAll(cityId);
        throw new Error();
        return result;
    }
}
