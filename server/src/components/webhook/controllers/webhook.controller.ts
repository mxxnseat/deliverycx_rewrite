import {
    Controller,
    Post,
    Body,
    Res,
    UseGuards,
    UseFilters
} from "@nestjs/common";
import { IPaymentWebhookDto } from "../../order/dto/paymentWebhook.dto";
import { Response } from "express";
import { PaymentService } from "src/services/payment/payment.service";
import { YooWebhookGuard } from "src/guards/yooWebhook.guard";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";

@Controller("webhook")
export class WebhookController {
    constructor(private readonly PaymentService: PaymentService) {}

    @Post("yoo")
    @UseFilters(UnauthorizedFilter)
    @UseGuards(YooWebhookGuard)
    async yowebhook(
        @Body() body: IPaymentWebhookDto,
        @Res() response: Response
    ) {
        console.log(body.object.status + " - " + body.object.id);
        if (body.object.status === "succeeded") {
            await this.PaymentService.captrurePayment(body);
        }

        response.status(200).json({});
    }
}
