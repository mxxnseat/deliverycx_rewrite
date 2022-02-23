import { Injectable } from "@nestjs/common";

export interface IOrderItem {
    product: UniqueId;
}

@Injectable()
export abstract class IOrderRepository {
    abstract create(
        userId: UniqueId,
        cartPrice: number,
        orderNumber: string,
        orderItems: Array<IOrderItem>
    ): Promise<void>;
}
