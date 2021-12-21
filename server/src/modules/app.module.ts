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
import * as path from "path";
import { createClient } from "redis";
import { WebhookModule } from "src/ioc/webhook.module";
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: path.resolve(
                __dirname,
                `../../.${process.env.NODE_ENV}.env`
            )
        }),
        ProductModule,
        CategoryModule,
        CityModule,
        OrganizationModule,
        UserModule,
        CartModule,
        OrderModule,
        FavoriteModule,
        WebhookModule
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
    async configure(consumer: MiddlewareConsumer) {
        const redisClientConfig =
            process.env.NODE_ENV === "production"
                ? {
                      host: process.env.REDIS_HOST
                  }
                : {
                      port: +process.env.REDIS_PORT,
                      host: process.env.REDIS_HOST
                  };

        const redisClient = createClient(redisClientConfig);

        consumer
            .apply(
                session({
                    store: new (RedisStore(session))({
                        client: redisClient,
                        logErrors: true
                    }),
                    secret: process.env.SESSION_SECRET,
                    resave: true,
                    saveUninitialized: false,
                    cookie: {
                        sameSite: true,
                        httpOnly: true
                    }
                })
            )
            .forRoutes("*");
    }
}
