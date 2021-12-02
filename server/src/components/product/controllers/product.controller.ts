import { Body, Controller, Get, Param, Query, Req } from "@nestjs/common";
import { Request } from "express";
import { IGetAllDto } from "../interfaces/getAll.dto";
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
    async getOne(@Param("id") productId: UniqueId) {
        const product = await this.productUsecase.getOne(productId);

        return product;
    }
}
