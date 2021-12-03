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
import { JoiPipe } from "nestjs-joi";
import * as Joi from "joi";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { ProductUsecase } from "../usecases/product.usecase";

@Controller("product")
export class ProductController {
    constructor(private readonly productUsecase: ProductUsecase) {}

    @Get("all")
    async getAll(
        @Query("categoryId")
        categoryId: string,
        @Req() request: Request,
        @Res() response: Response
    ) {
        if (!Types.ObjectId.isValid(categoryId)) {
            return response.status(HttpStatus.NOT_FOUND).json({
                path: request.path,
                message: `Товары по категории ${categoryId} не найдены`
            });
        }

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
        if (!Types.ObjectId.isValid(organizationId)) {
            return response.status(HttpStatus.NOT_FOUND).json({
                path: request.path,
                message: `Организация с ID ${organizationId} не найдена`
            });
        }

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
