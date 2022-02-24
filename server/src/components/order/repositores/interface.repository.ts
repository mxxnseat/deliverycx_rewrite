import { Injectable } from "@nestjs/common";
import { OrderDTO } from "../dto/order.dto";

export interface IOrderItem {
    product: UniqueId;
}

@Injectable()
export abstract class IOrderRepository {
    abstract create(
        userId: UniqueId,
        cartPrice: number,
        orderNumber: string,
        orderItems: Array<IOrderItem>,
        orderInfo: OrderDTO
    ): Promise<void>;
}
