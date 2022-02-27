import { DeliveryAddressEntity } from "../entities/addresses/deliveryAddresses.entity";
import { OrderDeliveredEntity } from "../entities/orderDelivered/orderDelivered.entity";

export interface IPutAddress {
    city: string;
    address: string;
}

export abstract class IPersonalCabinetRepository {
    abstract getOrders(
        user: UniqueId,
        page?: number
    ): Promise<Array<OrderDeliveredEntity>>;

    abstract getAddresses(
        user: UniqueId
    ): Promise<Array<DeliveryAddressEntity>>;

    abstract putAddress(user: UniqueId, address: IPutAddress): Promise<string>;
}
