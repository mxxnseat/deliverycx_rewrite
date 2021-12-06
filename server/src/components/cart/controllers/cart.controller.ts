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
import { cartDTO } from "../dto/add.dto";
import { ChangeAmountDTO } from "../dto/changeAmount.dto";
import { RemoveOneDTO } from "../dto/removeOne.dto";
import { CartUsecase } from "../usecases/cart.usecase";
import { ApiBody, ApiTags, ApiResponse, ApiCookieAuth } from "@nestjs/swagger";
import { ICartRepository } from "../repositories/interface.repository";
import { CartEntity } from "../entities/cart.entity";
import { ForbiddenDTO } from "src/common/dto/forbidden.dto";

@ApiTags("Cart endpoints")
@ApiResponse({
    status: 403,
    description: "Forbidden. в случае если пользователь без сессионных кук",
    type: ForbiddenDTO
})
@ApiCookieAuth()
@Controller("cart")
@UseGuards(AuthGuard)
export class CartController {
    constructor(private readonly cartUsecase: CartUsecase) {}

    @ApiBody({
        type: cartDTO
    })
    @ApiResponse({
        status: 200,
        type: CartEntity
    })
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

    @ApiBody({
        type: RemoveOneDTO
    })
    @ApiResponse({
        status: 200,
        type: String,
        description: "Возращает ID удаленного итема"
    })
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

    @ApiResponse({
        status: 200,
        description: "Возращает [] в случае успеха",
        type: Array
    })
    @Delete("deleteAll")
    async deleteAll(
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.removeAll(session.user);

        return result;
    }

    @ApiBody({
        type: ChangeAmountDTO
    })
    @ApiResponse({
        status: 200,
        type: Number
    })
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
    @ApiResponse({
        type: CartEntity,
        status: 200
    })
    async getAll(
        @Session()
        session: Record<string, string>
    ) {
        const result = await this.cartUsecase.getAll(session.user);

        return result;
    }
}
