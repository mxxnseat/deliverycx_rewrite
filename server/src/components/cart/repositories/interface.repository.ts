import { CartEntity } from '../entities/cart.entity';

export interface ICartRepository {
  getAll: (userId: UniqueId) => Promise<Array<CartEntity>>;
  removeAll: (userId: UniqueId) => Promise<any[]>;
  add: (userId: UniqueId, productId: UniqueId) => Promise<CartEntity>;
  removeOne: (userId: UniqueId, cartId: UniqueId) => Promise<UniqueId>;
  changeAmount: (
    userId: UniqueId,
    cartId: UniqueId,
    value: number,
  ) => Promise<number>;
}
