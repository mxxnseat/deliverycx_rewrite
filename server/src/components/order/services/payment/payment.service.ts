import { Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";

import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";

@Injectable()
export class PaymentService extends IPaymentService {
    private checkout: YooCheckout;

    constructor() {
        super();

        this.checkout = new YooCheckout({
            shopId: "865102",
            secretKey: "test_ZxNVT_a-d2CPNbTtfSCe522B9K_kUTBnyWD34Wjl_jM"
        });
    }

    async byCard(): Promise<string> {
        const idempotenceKey = "02347fc4-a1f0-49db-807e-f0d67c2ed5a5";

        const createPayload: ICreatePayment = {
            amount: {
                value: "50.00",
                currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
                type: "redirect",
                return_url: "test" // Set return url. Will be тест.хинкалыч.рф/order/success
            }
        };

        const payment = await this.checkout.createPayment(
            createPayload,
            idempotenceKey
        );
        console.log("payment", payment);

        const redirectUrl = payment.confirmation.confirmation_url;

        return redirectUrl;
    }

    byCash(): null {
        return null;
    }
}
