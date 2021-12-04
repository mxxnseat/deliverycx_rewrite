import { NotFoundError } from "../../../common/errors/notFound.error";
import { IProductRepository } from "../repositories/interface.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductUsecase {
    constructor(private readonly productRepository: IProductRepository) {}

    async getOne(productId: UniqueId) {
        const result = await this.productRepository.getOne(productId);

        if (!result.getId) {
            return new NotFoundError(`Товар с ID ${productId} не найден`);
        }

        return result;
    }

    async getAll(categoryId: UniqueId) {
        console.log(categoryId);
        const result = await this.productRepository.getAll(categoryId);

        return result;
    }

    async search(searchString: string, organizationId: UniqueId) {
        const result = await this.productRepository.getBySearch(
            searchString,
            organizationId
        );

        return result;
    }
}
