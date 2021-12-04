import { Module } from "@nestjs/common";
import { UserController } from "src/components/user/controllers/user.controller";
import { userProviders } from "src/components/user/providers/user.provider";
import { UserRepository } from "src/components/user/repositories/base.repository";
import { IUserRepository } from "src/components/user/repositories/interface.repository";
import { GenerateUsernameService } from "src/components/user/services/guestUsername.service";
import { UserUsecase } from "src/components/user/usecases/user.usecase";
import { DatabaseModule } from "src/modules/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        GenerateUsernameService,
        UserUsecase,
        { provide: IUserRepository, useClass: UserRepository },
        ...userProviders
    ]
})
export class UserModule {}
