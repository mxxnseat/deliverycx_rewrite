import { injectable } from "inversify";
import { ICategoryRepository } from "../interfaces/category.repository-abs";

@injectable()
export class CategoryRepository implements ICategoryRepository{
    async getAll<T extends object>(): Promise<Array<T>>{
        return [] as T[];
    }

    async getOne<T extends object>(): Promise<T>{
        return {a: 2} as T;
    }
}   