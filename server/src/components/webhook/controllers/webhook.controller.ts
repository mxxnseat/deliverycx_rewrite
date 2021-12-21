import { Controller, Post, Body } from "@nestjs/common";
import { IPaymentWebhookDto } from "../../order/dto/paymentWebhook.dto";

import { PaymentService } from "src/components/order/services/payment/payment.service";

@Controller("webhook")
export class WebhookController {
    constructor(private readonly PaymentService: PaymentService) {}

    @Post("yoo")
    async yowebhook(@Body() body: IPaymentWebhookDto) {
        console.log("we are here");
        console.log(body);

        if (body.object.status === "waiting_for_capture") {
            // const cart = await this.CartRepository.getAll(session.user);

            await this.PaymentService.captrurePayment(body);
            console.log("create order with orderUsecase");
            console.log(body);
            // const result = await this.OrderUsecase.create(
            //     session.user,
            //     cart,
            //     body as any
            // );
        }
    }
}
