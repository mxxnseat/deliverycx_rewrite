export abstract class IFavoriteRepository {
    abstract add_remove(productId: UniqueId, userId: UniqueId): Promise<any>;
}
