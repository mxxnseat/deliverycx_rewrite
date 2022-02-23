import { Inject, Injectable } from "@nestjs/common";
import { RedisClient } from "redis";
import { generateString } from "src/common/utils/generateString.util";
import { REDIS } from "src/modules/redis/redis.constants";

@Injectable()
export class SendCodeService {
    constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

    sendSMSCode(phone: string) {
        const code = generateString(9, -4);

        this.redis.set(code, phone, "EX", 60 * 1);

        console.log(code);
    }
}
