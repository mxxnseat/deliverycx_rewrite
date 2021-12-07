import { Module } from "@nestjs/common";
import { cartProviders } from "src/components/cart/providers/cart.provider";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderController } from "src/components/order/controllers/order.controller";
import { orderProviders } from "src/components/order/providers/order.provider";
import { OrderRepository } from "src/components/order/repositores/base.repository";
import { IOrderRepository } from "src/components/order/repositores/interface.repository";
import { ValidationCount } from "src/components/order/services/validationCount/validationCount.service";
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
        {
            provide: ValidationCount,
            useClass: ValidationCount
        },
        ...cartProviders,
        ...orderProviders
    ]
})
export class OrderModule {}
