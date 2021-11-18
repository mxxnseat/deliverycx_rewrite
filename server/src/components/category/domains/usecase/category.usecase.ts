import { inject, injectable } from "inversify";
import { TYPES } from "../../../../ioc/types.ioc";
import { ICategoryRepository } from "../../interfaces/category.repository-abs";
import { CategoryEntity, ICategoryEntity } from "../entity/category.entity";

@injectable()
export class CategoryUsecase{
    constructor(
        @inject(TYPES.CategoryRepository) private repository: ICategoryRepository<ICategoryEntity>
    ){}

    async getOne(productId: UniqueId): Promise<CategoryEntity>{
        const entity = await this.repository.getOne(productId);

        return entity as CategoryEntity;
    }
    getAll(): Array<CategoryEntity>{
        return []; 
    }
}