import { Module } from "@nestjs/common";
import { createClient } from "redis";

@Module({
    providers: [
        {
            provide: "REDIS",
            useValue: createClient({ port: 6379, host: "127.0.0.1" })
        }
    ],
    exports: ["REDIS"]
})
export class RedisModule {}
