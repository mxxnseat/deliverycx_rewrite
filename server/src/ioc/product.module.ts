import { Module } from "@nestjs/common";
import { ProductRepository } from "../components/product/repositories/base.repository";
import { IProductRepository } from "../components/product/repositories/interface.repository";
import { ProductUsecase } from "../components/product/usecases/product.usecase";
import { ProductController } from "../components/product/controllers/product.controller";
import { DatabaseModule } from "../modules/database.module";
import { productProviders } from "../components/product/providers/product.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [
        ProductUsecase,
        {
            provide: IProductRepository,
            useClass: ProductRepository
        },
        ...productProviders
    ]
})
export class ProductModule {}
