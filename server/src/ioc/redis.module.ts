import { Module } from "@nestjs/common";
import { createClient } from "redis";

@Module({
    providers: [
        {
            provide: "REDIS",
            useValue: createClient({ url: `redis://127.0.0.1:6379` })
        }
    ],
    exports: ["REDIS"]
})
export class RedisModule {}
