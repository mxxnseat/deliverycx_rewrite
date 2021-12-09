import { Module } from "@nestjs/common";
import { createClient } from "redis";

@Module({
    providers: [
        {
            provide: "REDIS",
            useValue: createClient({
                port: +process.env.REDIS_PORT,
                host: process.env.REDIS_HOST
            })
        }
    ],
    exports: ["REDIS"]
})
export class RedisModule {}
