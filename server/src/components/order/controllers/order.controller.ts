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
import { EmptyCartError } from "../errors/order.error";
import { BaseError } from "src/common/errors/base.error";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";
import { PaymentService } from "../services/payment/payment.service";
import {
    IPaymentWebhookBody,
    PaymentMethods
} from "../services/payment/payment.abstract";

@ApiTags("Order endpoints")
@ApiResponse({
    status: 401,
    description: "в случае если пользователь без сессионных кук"
})
@ApiCookieAuth()
@Controller("order")
@UseFilters(new ValidationException())
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
        private readonly PaymentService: PaymentService
    ) {}

    @ApiResponse({
        status: 200,
        type: OrderEntity,
        description: "Возращает номер заказа"
    })
    @ApiResponse({
        status: 400,
        type: BaseError,
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
            throw new EmptyCartError();
        }

        const paymentResult = await this.PaymentService.route(
            PaymentMethods.CARD
            // body.paymentMethod
        );

        console.log(paymentResult);

        if (paymentResult !== null) {
            console.log("we are redirected");
            // console.log(paymentResult);
            return response.status(301).redirect(paymentResult);
            // return;
        }

        const result = await this.OrderUsecase.create(session.user, cart, body);

        response.status(200).json(result);
    }

    @Post("yowebhook")
    async onlinePay(
        @Body() body: IPaymentWebhookBody,
        @Session() session: Record<string, string>
    ) {
        if (body.object.status === "succeded") {
            // const cart = await this.CartRepository.getAll(session.user);

            console.log("create order with orderUsecase");
            // const result = await this.OrderUsecase.create(
            //     session.user,
            //     cart,
            //     body as any
            // );
        }
    }
}

// {"type":"notification","event":"payment.waiting_for_capture","object":{"id":"2185355e-000f-5081-a000-0000000",
// "status":"waiting_for_capture","paid":true,"amount":{"value":"10.00","currency":"RUB"},"created_at":"2017-09-27T12:07:58.702Z",
// "expires_at":"2017-11-03T12:08:23.080Z","metadata":{},"payment_method":{"type":"bank_card","id":"2185355e-000f-5081-a000-0000000",
// "saved":false,"card":{"last4":"1026","expiry_month":"12","expiry_year":"2025","card_type":"Unknown"},"title":"Bank card *1026"},
// "recipient":{"account_id":"000005","gateway_id":"0000015"}}}
