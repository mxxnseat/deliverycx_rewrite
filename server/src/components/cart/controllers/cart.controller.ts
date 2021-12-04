import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Session,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "src/guards/authorize.guard";
import { cartDTO } from "../interfaces/add.dto";
import { ChangeAmountDTO } from "../interfaces/changeAmount.dto";
import { RemoveOneDTO } from "../interfaces/removeOne.dto";
import { CartUsecase } from "../usecases/cart.usecase";

@Controller("cart")
@UseGuards(AuthGuard)
export class CartController {
    constructor(private readonly cartUsecase: CartUsecase) {}

    @Post("add")
    async add(
        @Body()
        addBody: cartDTO,
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.add(
            session.user,
            addBody.productId
        );

        return result;
    }

    @Delete("removeOne")
    async removeOne(
        @Body()
        removeBody: RemoveOneDTO,
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.removeOne(
            session.user,
            removeBody.cartId
        );

        return result;
    }

    @Delete("deleteAll")
    async deleteAll(
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.removeAll(session.user);

        return result;
    }

    @Post("amount")
    async changeAmount(
        @Body()
        changeAmountBody: ChangeAmountDTO,
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.changeAmount(
            session.user,
            changeAmountBody.cartId,
            changeAmountBody.amount
        );

        return result;
    }

    @Get("getAll")
    async getAll(
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.getAll(session.user);

        return result;
    }
}
