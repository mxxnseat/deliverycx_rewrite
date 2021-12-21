import { Controller, Post, Body } from "@nestjs/common";
import { IPaymentWebhookDto } from "../../order/dto/paymentWebhook.dto";

import { PaymentService } from "src/services/payment/payment.service";

@Controller("webhook")
export class WebhookController {
    constructor(private readonly PaymentService: PaymentService) {}

    @Post("yoo")
    async yowebhook(@Body() body: IPaymentWebhookDto) {
        console.log("we are here");
        console.log(body.object.status);
        if (body.object.status === "waiting_for_capture") {
            // const cart = await this.CartRepository.getAll(session.user);

            await this.PaymentService.captrurePayment(body);
        }
    }
}
