import { Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { CustomerDTO } from "../dto/customer.dto";

@Injectable()
export abstract class IOrderRepository {
    abstract create(userId: UniqueId, cartPrice: number): Promise<void>;
}
