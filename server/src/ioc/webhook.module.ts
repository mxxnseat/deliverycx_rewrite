import { Module } from "@nestjs/common";
import { PaymentService } from "src/components/order/services/payment/payment.service";
import { WebhookController } from "src/components/webhook/controllers/webhook.controller";

@Module({
    controllers: [WebhookController],
    providers: [
        {
            provide: PaymentService,
            useClass: PaymentService
        }
    ]
})
export class WebhookModule {}
