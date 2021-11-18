import { injectable } from "inversify";
import { ICategoryEntity } from "../domains/entity/category.entity";
import { ICategoryRepository } from "../interfaces/category.repository-abs";

@injectable()
export class CategoryRepository implements ICategoryRepository<ICategoryEntity>{
    async getAll(){
        return [];
    }

    async getOne(){
        return {} as ICategoryEntity;
    }
}   