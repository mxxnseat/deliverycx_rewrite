import { Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { InternalException } from "src/filters/internal.filter";
import { CartModule } from "src/ioc/cart.module";
import { CityModule } from "src/ioc/city.module";
import { OrganizationModule } from "src/ioc/organization.module";
import { UserModule } from "src/ioc/user.module";

import { CategoryModule } from "../ioc/category.module";
import { ProductModule } from "../ioc/product.module";
import { OrderModule } from "src/ioc/order.module";
import { FavoriteModule } from "src/ioc/favorite.module";
import { BaseErrorsFilter } from "src/filters/base.filter";
import * as RedisStore from "connect-redis";
import * as session from "express-session";
import { createClient } from "redis";
import { RedisModule } from "src/ioc/redis.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: __dirname + "/../../.env"
        }),
        ProductModule,
        CategoryModule,
        CityModule,
        OrganizationModule,
        UserModule,
        CartModule,
        OrderModule,
        FavoriteModule,
        RedisModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: InternalException
        },
        {
            provide: APP_FILTER,
            useClass: BaseErrorsFilter
        }
    ]
})
export class AppModule implements NestModule {
    constructor(
        @Inject("REDIS") private readonly redis: ReturnType<typeof createClient>
    ) {}

    configure(consumer: MiddlewareConsumer) {
        console.log(this.redis);

        consumer
            .apply(
                session({
                    store: new (RedisStore(session))({
                        client: this.redis,
                        logErrors: true
                    }),
                    secret: process.env.SESSION_SECRET,
                    resave: true,
                    saveUninitialized: true,
                    cookie: {
                        sameSite: true,
                        httpOnly: false,
                        maxAge: 60000
                    }
                })
            )
            .forRoutes("*");
    }
}
