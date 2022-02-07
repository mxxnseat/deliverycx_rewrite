import { CartEntity } from "src/components/cart/entities/cart.entity";

export interface ICustomer {
    name: string;
    phone: string;
}

export abstract class IBotService {
    abstract sendDuplicate(
        address: string,
        customer: ICustomer,
        organization: UniqueId,
        cart: Array<CartEntity>
    ): void;
}
