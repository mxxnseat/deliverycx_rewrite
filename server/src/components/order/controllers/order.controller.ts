/// <reference path="../../../services/iiko/interfaces.ts" />

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
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { AuthGuard } from "src/guards/authorize.guard";
import { ApiTags, ApiResponse, ApiCookieAuth } from "@nestjs/swagger";
import { OrderUsecase } from "../usecases/order.usecase";
import { OrderDTO } from "../dto/order.dto";
import { ValidationException } from "src/filters/validation.filter";
import { OrderEntity } from "../entities/order.entity";
import { BaseErrorsFilter } from "src/filters/base.filter";
import { CannotDeliveryError, EmptyCartError } from "../errors/order.error";
import { BaseError } from "src/common/errors/base.error";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";
import { PaymentService } from "../../../services/payment/payment.service";
import { PaymentMethods } from "../../../services/payment/payment.abstract";
import { ValidationCount } from "../services/validationCount/validationCount.service";
import { PaymentException } from "src/filters/payment.filter";

@ApiTags("Order endpoints")
@ApiResponse({
    status: 401,
    description: "в случае если пользователь без сессионных кук"
})
@ApiCookieAuth()
@Controller("order")
@UseFilters(new ValidationException())
@UseFilters(new PaymentException())
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
@UseFilters(new UnauthorizedFilter())
@UseGuards(AuthGuard)
export class OrderController {
    constructor(
        private readonly OrderUsecase: OrderUsecase,
        private readonly CartRepository: ICartRepository,
        private readonly PaymentService: PaymentService,
        private readonly validationCountService: ValidationCount
    ) {}

    @ApiResponse({
        status: 200,
        type: OrderEntity,
        description: "Возращает номер заказа"
    })
    @Post("create")
    async create(
        @Body() body: OrderDTO,
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        const paymentResult = await this.PaymentService.route(
            body,
            session.user
        );

        response.status(200).json(paymentResult);
    }

    @ApiResponse({
        status: 200,
        type: "OK",
        description: "Возращает ОК в случае если доставка осуществляется"
    })
    @ApiResponse({
        status: 400,
        type: BaseError,
        description:
            "В случае, если пользователь пытается сделать заказ с пустой корзиной"
    })
    @Post("check")
    async checkOrder(
        @Body() body: OrderDTO,
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        const cart = await this.CartRepository.getAll(session.user);
        if (!cart.length) {
            throw new EmptyCartError();
        }

        this.validationCountService.validate(cart);

        const result = await this.OrderUsecase.checkOrder(session.user, body);

        if (result.numState !== iiko.ResultStateEnum.Success) {
            throw new CannotDeliveryError(
                `Доставка не может быть совершена по причине ${result.message}`
            );
        }

        response.status(200).json("OK");
    }
}
