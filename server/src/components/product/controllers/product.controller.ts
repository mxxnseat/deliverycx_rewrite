import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Query,
    Req,
    Res,
    UseFilters,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express";
import { ValidationException } from "src/filters/validation.filter";
import { GetAllDTO } from "../dto/getAll.dto";
import { GetByIdDTO } from "../dto/getById.dto";
import { SearchQueryDTO } from "../dto/searchQuery.dto";
import { ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { ProductUsecase } from "../usecases/product.usecase";
import { ProductEntity } from "../entities/product.entity";

@ApiTags("Product endpoints")
@Controller("product")
@UseFilters(new ValidationException())
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
export class ProductController {
    constructor(private readonly productUsecase: ProductUsecase) {}

    @ApiResponse({
        status: 200,
        type: [ProductEntity]
    })
    @Get("all")
    async getAll(
        @Query()
        query: GetAllDTO,
        @Req() request: Request,
        @Res() response: Response
    ) {
        const products = await this.productUsecase.getAll(query.categoryId);

        response.status(HttpStatus.OK).json(products);
    }

    @ApiResponse({
        status: 200,
        type: [ProductEntity]
    })
    @Get("search")
    async getBySearch(
        @Query() query: SearchQueryDTO,
        @Res() response: Response
    ) {
        const products = await this.productUsecase.search(
            query.searchString,
            query.organizationId
        );

        response.status(HttpStatus.OK).json(products);
    }

    @ApiResponse({
        status: 200,
        type: ProductEntity
    })
    @ApiParam({
        name: "id",
        type: "string"
    })
    @Get(":id")
    async getOne(
        @Param() param: GetByIdDTO,
        @Res() response: Response,
        @Req() request: Request
    ) {
        const product = await this.productUsecase.getOne(param.id);

        if (product instanceof Error) {
            return response.status(product.code).json({
                message: product.message
            });
        }
        response.status(HttpStatus.OK).json(product);
    }
}
