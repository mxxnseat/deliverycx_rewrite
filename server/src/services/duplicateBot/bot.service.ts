import { Inject, Injectable } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { IBotService, ICustomer } from "./bot.abstract";
import { BotAxios } from "./bot.axios";

@Injectable()
export class BotService extends IBotService {
    constructor(
        @Inject("BOT_AXIOS")
        private readonly botRequest: BotAxios
    ) {
        super();
    }

    public sendDuplicate(
        address: string,
        customer: ICustomer,
        organization: UniqueId,
        cart: Array<CartEntity>
    ) {
        this.botRequest.sendDuplicate(organization, {
            address: address,
            name: customer.name,
            phone: customer.phone,
            items: cart.map((el) => {
                return {
                    amount: el.getAmount,
                    name: el.getProductName
                };
            })
        });
    }
}
