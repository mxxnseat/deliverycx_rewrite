import { ProductClass } from "../../../database/models/product.model";
import { Mapper } from "../../../common/abstracts/mapper.interface";
import { ProductEntity } from "./product.entity";
import { CategoryClass } from "../../../database/models/category.model";

export const productMapper: Mapper<ProductClass, Array<ProductEntity>> = (
    p
) => {
    return p.map((product) => {
        return new ProductEntity(
            product.id,
            product.name,
            product.description,
            product.additionalInfo,
            product.price,
            product.weight,
            product.measureUnit,
            product.image,
            (product.category as CategoryClass)?.image
        );
    });
};
