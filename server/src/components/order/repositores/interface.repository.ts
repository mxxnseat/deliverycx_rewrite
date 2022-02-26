import { Injectable } from "@nestjs/common";
import { OrderDTO } from "../dto/order.dto";
import { OrderDeliveredEntity } from "../entities/orderDelivered/orderDelivered.entity";

export interface IOrderItem {
    product: UniqueId;
    amount: number;
}

export type IOrderInfo = Pick<OrderDTO, "organization"> & { address: string };

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

    abstract getOrders(
        user: UniqueId,
        page?: number
    ): Promise<Array<OrderDeliveredEntity>>;
}
