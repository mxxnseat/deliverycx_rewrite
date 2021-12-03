import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { JoiPipeModule } from "nestjs-joi";
import { InternalException } from "src/filters/internal.filter";
import { CityModule } from "src/ioc/city.module";
import { OrganizationModule } from "src/ioc/organization.module";

import { CategoryModule } from "../ioc/category.module";
import { ProductModule } from "../ioc/product.module";

@Module({
    imports: [
        JoiPipeModule,
        ProductModule,
        CategoryModule,
        CityModule,
        OrganizationModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: InternalException
        }
    ]
})
export class AppModule {}
