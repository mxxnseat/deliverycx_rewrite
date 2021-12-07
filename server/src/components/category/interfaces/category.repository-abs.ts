export interface ICategoryRepository<T>{
    getOne(productId: UniqueId): Promise<T>,
    getAll(): Promise<Array<T>>
}