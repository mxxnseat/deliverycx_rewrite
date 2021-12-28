import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { ICheckResult, ResultStateEnum } from "./interfaces";

export abstract class IIiko {
    abstract create: (
        cart: Array<CartEntity>,
        customerInfo: OrderDTO
    ) => Promise<string>;

    abstract check: (
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ) => Promise<ICheckResult>;
}
