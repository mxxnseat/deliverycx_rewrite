import { Inject, Injectable } from "@nestjs/common";
import { RedisClient } from "redis";
import { generateString } from "src/common/utils/generateString.util";
import { InternalException } from "src/filters/internal.filter";
import { REDIS } from "src/modules/redis/redis.constants";

@Injectable()
export class SendCodeService {
    constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

    async sendSMSCode(phone: string) {
        const code = generateString(9, -4);

        const isFind = await new Promise((resolve, reject) => {
            this.redis.get(code, (err, value) => {
                if (err) {
                    throw new InternalException();
                }

                resolve(value);
            });
        }).catch((e) => {
            throw e;
        });

        if (isFind) {
            await this.sendSMSCode(phone);
        } else {
            this.redis.set(code, phone, "EX", 60 * 1);
        }
    }
}
