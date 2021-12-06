import { Controller, Get, Query } from "@nestjs/common";
import { GetAllDTO } from "../interfaces/getAll.dto";
import { CategoryUsecase } from "../usecases/category.usecase";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { CategoryEntity } from "../entities/category.entity";

@ApiTags("Category endpoints")
@Controller("category")
export class CategoryController {
    constructor(private readonly categoryUsecase: CategoryUsecase) {}

    @ApiResponse({
        status: 200,
        type: [CategoryEntity]
    })
    @Get("all")
    async getAll(@Query() query: GetAllDTO) {
        const result = await this.categoryUsecase.getAll(query.organizationId);

        return result;
    }
}
