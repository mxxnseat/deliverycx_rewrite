import { Mapper } from "../../../common/abstracts/mapper.interface";
import { CategoryClass } from "../../../database/models/category.model";
import { CategoryEntity } from "./category.entity";

export const categoryMapper: Mapper<CategoryClass, Array<CategoryEntity>> = (
    p
) => {
    return p.map((category) => {
        return new CategoryEntity(category.id, category.name, category.image);
    });
};
