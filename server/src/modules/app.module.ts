import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CategoryModule } from "../ioc/category.module";
import { ProductModule } from "../ioc/product.module";

@Module({
    imports: [ProductModule, CategoryModule]
})
export class AppModule {}
