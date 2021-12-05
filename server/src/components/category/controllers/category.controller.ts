import { Controller, Get, Query } from "@nestjs/common";
import { GetAllDTO } from "../interfaces/getAll.dto";
import { CategoryUsecase } from "../usecases/category.usecase";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryUsecase: CategoryUsecase) {}

    @Get("all")
    async getAll(@Query() query: GetAllDTO) {
        const result = await this.categoryUsecase.getAll(query.organizationId);

        return result;
    }
}
