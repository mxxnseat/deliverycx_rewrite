import { Module } from "@nestjs/common";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderController } from "src/components/order/controllers/order.controller";
import { orderProviders } from "src/components/order/providers/order.provider";
import { OrderRepository } from "src/components/order/repositores/base.repository";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { DatabaseModule } from "src/modules/database.module";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { IikoService } from "src/services/iiko/iiko.service";

@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [
        OrderUsecase,
        {
            provide: IOrderRepository,
            useClass: OrderRepository
        },
        {
            provide: IIiko,
            useClass: IikoService
        },
        {
            provide: ICartRepository,
            useClass: CartRepository
        },
        ...orderProviders
    ]
})
export class OrderModule {}
