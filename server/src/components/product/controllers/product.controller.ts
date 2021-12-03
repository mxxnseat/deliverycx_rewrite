import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Query,
    Req,
    Res
} from "@nestjs/common";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { ProductUsecase } from "../usecases/product.usecase";

@Controller("product")
export class ProductController {
    constructor(private readonly productUsecase: ProductUsecase) {}

    @Get("all")
    async getAll(@Query("categoryId") categoryId: string) {
        const products = await this.productUsecase.getAll(categoryId);
        return products;
    }

    @Get("search")
    async getBySearch(
        @Query("searchString") searchString: string,
        @Query("organizationId") organizationId: UniqueId
    ) {
        const products = await this.productUsecase.search(
            searchString,
            organizationId
        );

        return products;
    }

    @Get(":id")
    async getOne(
        @Param("id") productId: UniqueId,
        @Res() response: Response,
        @Req() request: Request
    ) {
        if (!Types.ObjectId.isValid(productId)) {
            return response.status(HttpStatus.NOT_FOUND).json({
                path: request.path,
                message: `Продукт под ID ${productId} не найден`
            });
        }

        const product = await this.productUsecase.getOne(productId);

        response.status(200).json(product);
    }
}
