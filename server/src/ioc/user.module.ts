import { Module } from "@nestjs/common";
import { favoriteProviders } from "src/components/favorites/providers/favorite.provider";
import { FavoriteRepository } from "src/components/favorites/repositories/base.repository";
import { IFavoriteRepository } from "src/components/favorites/repositories/interface.repository";
import { UserController } from "src/components/user/controllers/user.controller";
import { userProviders } from "src/components/user/providers/user.provider";
import { UserRepository } from "src/components/user/repositories/base.repository";
import { IUserRepository } from "src/components/user/repositories/interface.repository";
import { GenerateUsernameService } from "src/components/user/services/guestUsername.service";
import { IGuestGenerateService } from "src/components/user/services/guestUsername.stub";
import { UserUsecase } from "src/components/user/usecases/user.usecase";
import { RedisModule } from "src/modules/redis/redis.module";

@Module({
    imports: [RedisModule],
    controllers: [UserController],
    providers: [...favoriteProviders, ...userProviders]
})
export class UserModule {}
