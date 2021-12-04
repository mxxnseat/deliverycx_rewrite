import {
    ProductClass,
    ProductModel
} from "../../../database/models/product.model";
import { IProductRepository } from "./interface.repository";
import { ProductEntity } from "../entities/product.entity";
import { CategoryClass } from "../../../database/models/category.model";
import { BaseRepository } from "../../../common/abstracts/base.repository";
import { productMapper } from "../entities/product.mapper";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository
    extends BaseRepository<ProductClass, ProductEntity>
    implements IProductRepository
{
    constructor(
        @Inject("PRODUCT_MODEL")
        private readonly productModel: Model<ProductClass>
    ) {
        super(ProductModel, productMapper, "category", "category");
    }

    async getOne(productId: UniqueId) {
        const entity = await this.productModel
            .findOne({ _id: productId })
            .populate("category");

        return new ProductEntity(
            entity?.id,
            entity?.name,
            entity?.description,
            entity?.additionalInfo,
            entity?.price,
            entity?.weight,
            entity?.measureUnit,
            entity?.image,
            (entity?.category as CategoryClass)?.image
        );
    }

    async getBySearch(searchString: string, organizationId: UniqueId) {
        const entities = await this.productModel.find({
            organization: organizationId,
            name: { $regex: searchString, $options: "i" }
        });

        const result = entities.map((entity) => {
            return new ProductEntity(
                entity?.id,
                entity?.name,
                entity?.description,
                entity?.additionalInfo,
                entity?.price,
                entity?.weight,
                entity?.measureUnit,
                entity?.image,
                (entity?.category as CategoryClass)?.image
            );
        });

        return result;
    }
}
