import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Query,
    Req,
    Res,
    UsePipes
} from "@nestjs/common";
import { Request, Response } from "express";
import { ValidationObjectId } from "src/pipes/validationObjectId.pipe";

import { ProductUsecase } from "../usecases/product.usecase";

@Controller("product")
@UsePipes(new ValidationObjectId())
export class ProductController {
    constructor(private readonly productUsecase: ProductUsecase) {}

    @Get("all")
    async getAll(
        @Query("categoryId")
        categoryId: string,
        @Req() request: Request,
        @Res() response: Response
    ) {
        const products = await this.productUsecase.getAll(categoryId);

        response.status(HttpStatus.OK).json(products);
    }

    @Get("search")
    async getBySearch(
        @Query("organizationId") organizationId: UniqueId,
        @Query("searchString") searchString: string = "",
        @Req() request: Request,
        @Res() response: Response
    ) {
        const products = await this.productUsecase.search(
            searchString,
            organizationId
        );

        response.status(HttpStatus.OK).json(products);
    }

    @Get(":id")
    async getOne(
        @Param("id") productId: UniqueId,
        @Res() response: Response,
        @Req() request: Request
    ) {
        const product = await this.productUsecase.getOne(productId);

        if (product instanceof Error) {
            return response.status(product.code).json({
                message: product.message
            });
        }

        response.status(HttpStatus.OK).json(product);
    }
}
