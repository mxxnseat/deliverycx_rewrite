import { BadRequestException } from "@nestjs/common";

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
    async route(paymentMethod: PaymentMethods): Promise<RedirectURI> {
        switch (paymentMethod) {
            case PaymentMethods.CARD:
                return await this.byCard();
            case PaymentMethods.CASH:
                return await this.byCash();
            default:
                throw new BadRequestException();
        }
    }

    abstract byCash(): null;
    abstract byCard(): Promise<string>;
}
