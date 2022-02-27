import { getConnectionToken } from "@nestjs/mongoose";
import { Connection, connect } from "mongoose";
import { FavoriteRepository } from "src/components/favorites/repositories/base.repository";
import { IFavoriteRepository } from "src/components/favorites/repositories/interface.repository";
import { orderProviders } from "src/components/order/providers/order.provider";
import { OrderRepository } from "src/components/order/repositores/base.repository";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { UserSchema } from "../../../database/models/user.model";
import { UserRepository } from "../repositories/base.repository";
import { IUserRepository } from "../repositories/interface.repository";
import { GenerateUsernameService } from "../services/guestUsername.service";
import { IGuestGenerateService } from "../services/guestUsername.stub";
import { RegisterService } from "../services/register/register.service";
import { SendCodeService } from "../services/sendCode/sendCode.service";
import { UpdateOptionsService } from "../services/updateUserOptions/updateOptions.service";
import { UserUsecase } from "../usecases/user.usecase";
import { InjectTokenEnum } from "./constants";

export const userProviders = [
    {
        provide: InjectTokenEnum.USER,
        useFactory: (connection: Connection) =>
            connection.model("User", UserSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },

    {
        provide: InjectTokenEnum.SEND_CODE_SERVICE,
        useClass: SendCodeService
    },
    {
        provide: InjectTokenEnum.REGISTER_SERVICE,
        useClass: RegisterService
    },
    {
        provide: InjectTokenEnum.UPDATE_OPTIONS_SERVICE,
        useClass: UpdateOptionsService
    },
    {
        provide: UserUsecase,
        useClass: UserUsecase
    },
    {
        provide: IUserRepository,
        useClass: UserRepository
    },
    {
        provide: IFavoriteRepository,
        useClass: FavoriteRepository
    },
    {
        provide: IGuestGenerateService,
        useClass: GenerateUsernameService
    },
    {
        provide: IOrderRepository,
        useClass: OrderRepository
    },
    ...orderProviders
];
