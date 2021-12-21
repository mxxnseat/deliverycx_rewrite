import { BadRequestException } from "@nestjs/common";
import { OrderDTO } from "src/components/order/dto/order.dto";

export enum PaymentMethods {
    CASH = "CASH",
    CARD = "CARD"
}

export abstract class IPaymentService {
    /*
        Метод определяющий тип оплаты,
        и вызывает метод для конекретного
        типа оплаты
    */
    async route(body: OrderDTO, userId: UniqueId): Promise<RedirectURI> {
        switch (body.paymentMethod) {
            case PaymentMethods.CARD:
                return await this._byCard(body, userId);
            case PaymentMethods.CASH:
                return await this._byCash();
            default:
                throw new BadRequestException();
        }
    }

    abstract _byCash(): null;
    abstract _byCard(body: OrderDTO, userId: UniqueId): Promise<string>;
}
