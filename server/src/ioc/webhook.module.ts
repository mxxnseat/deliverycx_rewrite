import { Module } from "@nestjs/common";
import { PaymentService } from "src/services/payment/payment.service";
import { WebhookController } from "src/components/webhook/controllers/webhook.controller";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { OrderRepository } from "src/components/order/repositores/base.repository";
import { orderProviders } from "src/components/order/providers/order.provider";
import { IikoService } from "src/services/iiko/iiko.service";
import { MailService } from "src/services/mail/mail.service";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { DeliveryService } from "src/services/delivery/delivery.service";
import { productProviders } from "src/components/product/providers/product.provider";
import { IikoModule } from "src/modules/iiko.module";
import { IikoWebsocketGateway } from "src/services/iiko/iiko.gateway";
import { paymasterProvider } from "src/services/payment/sdk/provider/paymaster.provider";
import { RedisModule } from "src/modules/redis/redis.module";
import { IOrderUtilsService } from "src/components/order/services/order/interface.service";
import { OrderUtilsService } from "src/components/order/services/order/base.service";
import { BotAxiosProvider } from "src/services/duplicateBot/bot.axios";
import { OrderCreateBuilder } from "src/components/order/usecases/builders/orderCreate.builder";
import { OrderCheckBuilder } from "src/components/order/usecases/builders/orderCheck.builder";
import { ValidationCount } from "src/components/order/services/validationCount/validationCount.service";
import { IBotService } from "src/services/duplicateBot/bot.abstract";
import { BotService } from "src/services/duplicateBot/bot.service";

@Module({
    imports: [IikoModule, RedisModule],
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
            provide: IOrderUtilsService,
            useClass: OrderUtilsService
        },
        {
            provide: "IIiko",
            useClass: IikoService
        },
        {
            provide: OrderCreateBuilder,
            useClass: OrderCreateBuilder
        },
        {
            provide: OrderCheckBuilder,
            useClass: OrderCheckBuilder
        },
        {
            provide: ValidationCount,
            useClass: ValidationCount
        },
        {
            provide: IBotService,
            useClass: BotService
        },
        BotAxiosProvider,
        paymasterProvider,
        IikoWebsocketGateway,
        ...productProviders,
        ...orderProviders,
        OrderUsecase,
        MailService
    ]
})
export class WebhookModule {}
