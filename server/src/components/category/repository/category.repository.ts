import { ICategoryRepository } from "../interfaces/category.repository-abs";




export class CategoryRepository implements ICategoryRepository{
    async getAll<T extends object>(): Promise<Array<T>>{
        return [] as T[];
    }

    async getOne<T extends Object>(): Promise<T>{
        return {} as T;
    }
}