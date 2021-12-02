import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';

// export interface IProductRepository {
//     getOne: (productId: UniqueId) => Promise<ProductEntity>;
//     getAll: (categoryId: UniqueId) => Promise<Array<ProductEntity>>;
//     getBySearch: (
//         searchString: string,
//         organizationId: UniqueId
//     ) => Promise<Array<ProductEntity>>;
// }

@Injectable()
export abstract class IProductRepository {
  abstract getOne(productId: UniqueId): Promise<ProductEntity>;

  abstract getAll: (categoryId: UniqueId) => Promise<Array<ProductEntity>>;

  abstract getBySearch: (
    searchString: string,
    organizationId: UniqueId,
  ) => Promise<Array<ProductEntity>>;
}
