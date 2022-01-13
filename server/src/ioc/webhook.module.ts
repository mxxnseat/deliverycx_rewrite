import { Module } from "@nestjs/common";
import { PaymentService } from "src/services/payment/payment.service";
import { WebhookController } from "src/components/webhook/controllers/webhook.controller";
import { DatabaseModule } from "src/modules/database.module";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { OrderRepository } from "src/components/order/repositores/base.repository";
import { orderProviders } from "src/components/order/providers/order.provider";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { IikoService } from "src/services/iiko/iiko.service";
import { MailService } from "src/services/mail/mail.service";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { DeliveryService } from "src/services/delivery/delivery.service";
import { productProviders } from "src/components/product/providers/product.provider";
import { StopListUsecase } from "src/components/stopList/usecases/stopList.usecase";
import { stopListProviders } from "src/components/stopList/providers/stopList.provider";
import { IStopListRepository } from "src/components/stopList/repositories/interface.repository";
import { stopListRepository } from "src/components/stopList/repositories/base.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [WebhookController],
    providers: [
        {
            provide: PaymentService,
            useClass: PaymentService
        },
        {
            provide: ICartRepository,
            useClass: CartRepository
        },
        {
            provide: IDeliveryService,
            useClass: DeliveryService
        },
        {
            provide: IOrderRepository,
            useClass: OrderRepository
        },
        {
            provide: IIiko,
            useClass: IikoService
        },
        {
            provide: StopListUsecase,
            useClass: StopListUsecase
        },
        {
            provide: IStopListRepository,
            useClass: stopListRepository
        },
        ...productProviders,
        ...orderProviders,
        ...stopListProviders,
        OrderUsecase,
        MailService
    ]
})
export class WebhookModule {}
