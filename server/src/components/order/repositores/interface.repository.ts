import { Injectable } from "@nestjs/common";
import { DeliveryAddressEntity } from "src/components/personalCabinet/entities/addresses/deliveryAddresses.entity";
import { OrderDTO } from "../dto/order.dto";
import { OrderDeliveredEntity } from "../../personalCabinet/entities/orderDelivered/orderDelivered.entity";

export interface IOrderItem {
    product: UniqueId;
    amount: number;
}

export type IOrderInfo = Pick<OrderDTO, "organization"> & { address: UniqueId };

@Injectable()
export abstract class IOrderRepository {
    abstract create(
        userId: UniqueId,
        cartPrice: number,
        orderNumber: string,
        orderItems: Array<IOrderItem>,
        orderInfo: IOrderInfo,
        deliveryPrice: number
    ): Promise<void>;
}
