export interface ICategoryRepository{
    getOne<T extends object>(productId: UniqueId): Promise<T>,
    getAll<T extends object>(): Promise<Array<T>>
}