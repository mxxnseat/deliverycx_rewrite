import { Injectable } from "@nestjs/common";
import { OrderDTO } from "../dto/order.dto";

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
        orderInfo: IOrderInfo
    ): Promise<void>;
}
