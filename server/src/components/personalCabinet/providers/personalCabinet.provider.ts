import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { DeliveredAddressSchema } from "src/database/models/deliveryAddresses.model";
import { OrderSchema } from "src/database/models/order.model";
import { PersonalCabinetRepository } from "../repositories/base.repository";
import { IPersonalCabinetRepository } from "../repositories/interface.repository";
import { PersonalCabinetUsecase } from "../usecases/personalCabinet.usecase";
import { PersonalCabinetEnum } from "./constants";

export const personalCabinetProviders = [
    {
        provide: PersonalCabinetEnum.DELIVERED_ADDRESS,
        useFactory: (connection: Connection) =>
            connection.model("DeliveredAddress", DeliveredAddressSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },
    {
        provide: PersonalCabinetEnum.ORDER,
        useFactory: (connection: Connection) =>
            connection.model("Order", OrderSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },
    {
        provide: PersonalCabinetUsecase,
        useClass: PersonalCabinetUsecase
    },
    {
        provide: IPersonalCabinetRepository,
        useClass: PersonalCabinetRepository
    }
];
