import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Res,
    Session,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "src/guards/authorize.guard";
import { cartDTO } from "../dto/add.dto";
import { ChangeAmountDTO } from "../dto/changeAmount.dto";
import { RemoveOneDTO } from "../dto/removeOne.dto";
import { CartUsecase } from "../usecases/cart.usecase";
import { ApiBody, ApiTags, ApiResponse, ApiCookieAuth } from "@nestjs/swagger";
import { CartEntity } from "../entities/cart.entity";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";
import { ValidationException } from "src/filters/validation.filter";
import { Types } from "mongoose";
import { number } from "joi";
import { Response } from "express";

@ApiTags("Cart endpoints")
@ApiResponse({
    status: 401,
    description: "в случае если пользователь без сессионных кук"
})
@ApiCookieAuth()
@Controller("cart")
@UseFilters(new ValidationException())
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
@UseFilters(new UnauthorizedFilter())
@UseGuards(AuthGuard)
export class CartController {
    constructor(private readonly cartUsecase: CartUsecase) {}

    @ApiBody({
        type: cartDTO
    })
    @ApiResponse({
        status: 200,
        schema: {
            properties: {
                item: { type: "object", example: CartEntity },
                totalPrice: { type: "number", example: 1200 }
            }
        }
    })
    @Post("add")
    async add(
        @Body()
        addBody: cartDTO,
        @Session()
        session: Record<string, string>,
        @Res() response: Response
    ) {
        const result = await this.cartUsecase.add(
            session.user,
            addBody.productId
        );

        response.status(200).json(result);
    }

    @ApiBody({
        type: RemoveOneDTO
    })
    @ApiResponse({
        status: 200,
        schema: {
            properties: {
                deletedId: {
                    type: "string",
                    example: "61b609abaabff8e544dfecee"
                },
                totalPrice: { type: "number", example: 1200 }
            }
        },
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
        schema: {
            properties: {
                amount: { type: "number", example: 100 },
                totalPrice: { type: "number", example: 1200 }
            }
        }
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
        schema: {
            properties: {
                cart: { type: "array", example: [] },
                totalPrice: { type: "number", example: 1200 }
            }
        },
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
