import { Controller, Post, Body, Res } from "@nestjs/common";
import { IPaymentWebhookDto } from "../../order/dto/paymentWebhook.dto";
import { Response } from "express";
import { PaymentService } from "src/services/payment/payment.service";

@Controller("webhook")
export class WebhookController {
    constructor(private readonly PaymentService: PaymentService) {}

    @Post("yoo")
    async yowebhook(
        @Body() body: IPaymentWebhookDto,
        @Res() response: Response
    ) {
        console.log(body.object.status + " - " + body.object.id);
        if (body.object.status === "waiting_for_capture") {
            // const cart = await this.CartRepository.getAll(session.user);

            await this.PaymentService.captrurePayment(body);
        }

        response.status(200).json({});
    }
}
