import { iiko } from "src/services/iiko/interfaces";
import { IWebHookEvent } from "@a2seven/yoo-checkout";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { FilterNoZeroBalanceType } from "src/components/stopList/entities/stopList.entity";

export enum OrderTypesEnum {
    PICKUP = "PICKUP",
    COURIER = "COURIER"
}

export abstract class IIiko {
    abstract create: (
        userId: UniqueId,
        cart: Array<CartEntity>,
        customerInfo: OrderDTO
    ) => Promise<string>;

    abstract check: (
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ) => Promise<iiko.ICheckResult>;

    abstract getStopList: (
        body: iiko.IWebhookEvent
    ) => Promise<ReturnTypeAsync<FilterNoZeroBalanceType>>;
}
