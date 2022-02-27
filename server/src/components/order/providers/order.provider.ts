import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { PersonalCabinetEnum } from "src/components/personalCabinet/providers/constants";
import { PersonalCabinetRepository } from "src/components/personalCabinet/repositories/base.repository";
import { IPersonalCabinetRepository } from "src/components/personalCabinet/repositories/interface.repository";
import { DeliveredAddressSchema } from "src/database/models/deliveryAddresses.model";
import { OrderModel, OrderSchema } from "src/database/models/order.model";
import { OrderProvideEnum } from "./constants";

export const orderProviders = [
    {
        provide: OrderProvideEnum.ORDER,
        useFactory: (connection: Connection) =>
            connection.model("Order", OrderSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },
    {
        provide: PersonalCabinetEnum.DELIVERED_ADDRESS,
        useFactory: (connection: Connection) =>
            connection.model("DeliveredAddress", DeliveredAddressSchema),
        inject: [getConnectionToken("DatabaseConnection")]
    },
    {
        provide: IPersonalCabinetRepository,
        useClass: PersonalCabinetRepository
    }
];
