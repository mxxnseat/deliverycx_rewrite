import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderTypesEnum } from "../iiko/iiko.abstract";

export interface IDeliveryPrices {
    deliveryPrice: number;
    deltaPrice: number;
    totalPrice: number;
}

export abstract class IDeliveryService {
    abstract calculatingPrices(
        userId: UniqueId,
        orderType: OrderTypesEnum
    ): Promise<IDeliveryPrices>;
}
