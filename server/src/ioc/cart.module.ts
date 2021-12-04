import { Module } from "@nestjs/common";
import { CartController } from "src/components/cart/controllers/cart.controller";
import { cartProviders } from "src/components/cart/providers/cart.provider";
import { CartRepository } from "src/components/cart/repositories/base.repository";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { CartUsecase } from "src/components/cart/usecases/cart.usecase";
import { DatabaseModule } from "src/modules/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [CartController],
    providers: [
        CartUsecase,
        {
            provide: ICartRepository,
            useClass: CartRepository
        },
        cartProviders
    ]
})
export class CartModule {}
