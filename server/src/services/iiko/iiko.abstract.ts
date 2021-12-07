import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";

export abstract class IIiko {
    abstract create: (
        cart: Array<CartEntity>,
        customerInfo: OrderDTO
    ) => Promise<string>;
}
