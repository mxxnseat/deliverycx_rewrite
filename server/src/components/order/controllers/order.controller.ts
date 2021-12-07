import {
    Body,
    Controller,
    Post,
    Res,
    Session,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { ForbiddenDTO } from "src/common/dto/forbidden.dto";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { AuthGuard } from "src/guards/authorize.guard";
import { ApiTags, ApiResponse, ApiCookieAuth } from "@nestjs/swagger";
import { OrderUsecase } from "../usecases/order.usecase";
import { OrderDTO } from "../dto/order.dto";
import { BaseErrorDTO } from "src/common/dto/base.dto";
import { ValidationException } from "src/filters/validation.filter";
import { OrderEntity } from "../entities/order.entity";

@ApiTags("Order endpoints")
@ApiResponse({
    status: 403,
    description: "Forbidden. в случае если пользователь без сессионных кук",
    type: ForbiddenDTO
})
@ApiCookieAuth()
@Controller("order")
@UseFilters(new ValidationException())
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
@UseGuards(AuthGuard)
export class OrderController {
    constructor(
        private readonly OrderUsecase: OrderUsecase,
        private readonly CartRepository: ICartRepository
    ) {}

    @ApiResponse({
        status: 200,
        type: OrderEntity,
        description: "Возращает номер заказа"
    })
    @ApiResponse({
        status: 400,
        type: BaseErrorDTO,
        description:
            "В случае, если пользователь пытается сделать заказ с пустой корзиной"
    })
    @Post("create")
    async create(
        @Body() body: OrderDTO,
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        const cart = await this.CartRepository.getAll(session.user);

        if (!cart.length) {
            return response.status(400).json({
                message:
                    "Вы не можете создать заказ, так как ваша корзина пуста"
            });
        }

        const result = await this.OrderUsecase.create(session.user, cart, body);

        response.status(200).json(result);
    }
}
