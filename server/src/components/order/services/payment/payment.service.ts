import { Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import { v4 as uuidv4 } from "uuid";
import {
    YooCheckout,
    ICreatePayment,
    ICapturePayment
} from "@a2seven/yoo-checkout";
import { IPaymentWebhookDto } from "../../dto/paymentWebhook.dto";

@Injectable()
export class PaymentService extends IPaymentService {
    private checkout: YooCheckout;

    constructor() {
        super();

        this.checkout = new YooCheckout({
            shopId: "866115",
            secretKey: "test_LT0AumHCI0dRW43iMJ2P8yodIlETm2sZQQb8LG9llQs"
        });
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        const idempotenceKey = uuidv4();
        console.log(body);

        const capturePayload: ICapturePayment = {
            amount: {
                value: body.object.amount.value,
                currency: body.object.amount.currency
            }
        };

        const payment = await this.checkout.capturePayment(
            body.object.id,
            capturePayload,
            idempotenceKey
        );

        console.log(payment);
    }

    async byCard(): Promise<string> {
        const idempotenceKey = uuidv4();

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

        // const webHookList = await this.checkout.getWebHookList();
        // console.log(webHookList);
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
