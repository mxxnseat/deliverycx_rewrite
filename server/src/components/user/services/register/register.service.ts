import { Inject, Injectable } from "@nestjs/common";
import { RedisClient } from "redis";
import { NotFoundError } from "src/components/product/errors/product.error";
import { InternalException } from "src/filters/internal.filter";
import { REDIS } from "src/modules/redis/redis.constants";
import { UserUsecase } from "../../usecases/user.usecase";

@Injectable()
export class RegisterService {
    constructor(
        @Inject(REDIS)
        private readonly redis: RedisClient,

        private readonly userUsecase: UserUsecase
    ) {}

    async register(user: UniqueId, code: string) {
        const phone = await new Promise<string>((resolve, reject) => {
            this.redis.get(code, (err, value) => {
                if (err) {
                    console.log(err);
                    reject(new InternalException());
                }

                if (!value) {
                    reject(
                        new NotFoundError(
                            `В базе по ${code}, не найден телефон, или время истекло. Попробуйте еще раз`
                        )
                    );
                }

                resolve(value);
            });
        }).catch((e) => {
            throw e;
        });

        return await this.userUsecase.create(user, phone);
    }
}
