import {
    Controller,
    Post,
    Body,
    Res,
    UseGuards,
    UseFilters,
    Inject
} from "@nestjs/common";
import { iiko } from "src/services/iiko/interfaces";
import { IPaymentWebhookDto } from "../../order/dto/paymentWebhook.dto";
import { response, Response } from "express";
import { PaymentService } from "src/services/payment/payment.service";
import { YooWebhookGuard } from "src/guards/yooWebhook.guard";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";
import { IikoWebhookGuard } from "src/guards/iikoWebhook.guard";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { IikoWebsocketGateway } from "src/services/iiko/iiko.gateway";
import { ApiResponse } from "@nestjs/swagger";
import { StopListEntity } from "src/components/stopList/entities/stopList.entity";

@Controller("webhook")
export class WebhookController {
    constructor(
        @Inject("IIiko")
        private readonly IikoService: IIiko,

        private readonly PaymentService: PaymentService,
        private readonly IikoStopListGateway: IikoWebsocketGateway
    ) {}

    @Post("yoo")
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

    @ApiResponse({
        description:
            "Подключение по http://localhost:9870/iiko для дева, и для прода / и указать порт 9870. Слушать событие stoplist_event",
        type: StopListEntity
    })
    @Post("iiko")
    @UseGuards(IikoWebhookGuard)
    async iikowebhook(
        @Body() body: iiko.IWebhookEvent,
        @Res() response: Response
    ) {
        console.log("Iiko send data from webhook");
        const stopListEntity = await this.IikoService.getStopList(body);

        this.IikoStopListGateway.sendStopListToClient(stopListEntity);

        response.status(200).json({});
    }
}
