import { NotFoundError } from "../../../common/errors/notFound.error";
import { IProductRepository } from "../repositories/interface.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductUsecase {
    constructor(private readonly productRepository: IProductRepository) {}

    async getOne(productId: UniqueId, userId: UniqueId) {
        const result = await this.productRepository.getOne(productId, userId);

        if (!result.getId) {
            return new NotFoundError(`Товар с ID ${productId} не найден`);
        }

        return result;
    }

    async getAll(categoryId: UniqueId, userId: UniqueId) {
        console.log(categoryId);
        const result = await this.productRepository.getAll(categoryId, userId);

        return result;
    }

    async search(
        searchString: string,
        organizationId: UniqueId,
        userId: UniqueId
    ) {
        const result = await this.productRepository.getBySearch(
            searchString,
            organizationId,
            userId
        );

        return result;
    }
}
