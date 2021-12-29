import { Injectable } from "@nestjs/common";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { IDeliveryPrices, IDeliveryService } from "./delivery.abstract";

@Injectable()
export class DeliveryService implements IDeliveryService {
    constructor(private readonly cartRepository: ICartRepository) {}

    private async deliveryPriceCalculating(price: number): Promise<number> {
        return price < 600 ? 150 : 0;
    }
    private async cartPriceCalculating(userId: UniqueId): Promise<number> {
        const totalPrice = await this.cartRepository.calc(userId);

        return totalPrice;
    }

    public async calculatingPrices(userId: UniqueId): Promise<IDeliveryPrices> {
        const totalPrice = await this.cartPriceCalculating(userId);
        const deliveryPrice = await this.deliveryPriceCalculating(totalPrice);

        const deltaPrice = 600 - totalPrice < 0 ? 0 : 600 - totalPrice;

        return {
            deliveryPrice,
            totalPrice,
            deltaPrice
        };
    }
}
