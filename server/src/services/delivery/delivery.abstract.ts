import { CartEntity } from "src/components/cart/entities/cart.entity";

export interface IDeliveryPrices {
    deliveryPrice: number;
    deltaPrice: number;
    totalPrice: number;
}

export abstract class IDeliveryService {
    abstract calculatingPrices(userId: UniqueId): Promise<IDeliveryPrices>;
}
