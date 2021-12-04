import { Controller, Get, Query } from "@nestjs/common";
import { CategoryUsecase } from "../usecases/category.usecase";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryUsecase: CategoryUsecase) {}

    @Get("all")
    async getAll(@Query("organizationId") organizationId: UniqueId) {
        const result = await this.categoryUsecase.getAll(organizationId);

        return result;
    }
}
