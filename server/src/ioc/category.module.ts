import { Module } from "@nestjs/common";
import { DatabaseModule } from "../modules/database.module";
import { categoryProviders } from "../components/category/providers/category.provider";
import { CategoryUsecase } from "src/components/category/usecases/category.usecase";
import { ICategoryRepository } from "src/components/category/repositories/interface.repository";
import { CategoryRepository } from "src/components/category/repositories/base.repository";

@Module({
    imports: [DatabaseModule],
    // controllers: [ProductController],
    providers: [
        CategoryUsecase,
        {
            provide: ICategoryRepository,
            useClass: CategoryRepository
        },
        ...categoryProviders
    ]
})
export class CategoryModule {}
