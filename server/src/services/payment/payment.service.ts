import { Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import { v4 as uuidv4 } from "uuid";
import {
    YooCheckout,
    ICreatePayment,
    ICapturePayment
} from "@a2seven/yoo-checkout";
import { IPaymentWebhookDto } from "../../components/order/dto/paymentWebhook.dto";
import { createClient, RedisClient } from "redis";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { OrderDTO } from "src/components/order/dto/order.dto";

@Injectable()
export class PaymentService extends IPaymentService {
    private checkout: YooCheckout;

    constructor(
        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase
    ) {
        super();

        this.checkout = new YooCheckout({
            shopId: "866115",
            secretKey: "test_LT0AumHCI0dRW43iMJ2P8yodIlETm2sZQQb8LG9llQs"
        });
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        const capturePayload: ICapturePayment = {
            amount: {
                value: body.object.amount.value,
                currency: body.object.amount.currency
            }
        };
        const payment = await this.checkout.capturePayment(
            body.object.id,
            capturePayload,
            body.object.id
        );

        // console.log(body);

        /*  
                read body.object.id from body,
                try found in redis and call orderUsecase
            */

        // this.redisClient.get(body.object.id, async (err, userId) => {
        //     const cart = await this.cartRepository.getAll(userId);

        //     // console.log(cart);

        //     // console.log(payment);

        //     /*  TODO:
        //         transfer ordetInfo throught methods
        //     */
        //     this.orderUsecase.create(userId, cart, {} as any);
        // });
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<string> {
        const idempotenceKey = uuidv4();

        const { paymentMethod, ...orderInfo } = body;
        const { address, ...rest } = orderInfo;
        const metadata = {
            ...rest,
            address_city: address.city,
            address_street: address.street,
            address_home: address.home,
            address_entrance: address.entrance,
            address_flat: address.flat,
            address_floor: address.floor,
            address_intercom: address.intercom
        };

        const createPayload: ICreatePayment = {
            amount: {
                value: "50.00",
                currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
                type: "redirect",
                return_url: "test" // Set return url. Will be тест.хинкалыч.рф/order/success
            },
            metadata: {
                ...metadata,
                user: userId
            }
        };

        // const webHookList = await this.checkout.getWebHookList();
        // console.log(webHookList);
        const payment = await this.checkout.createPayment(
            createPayload,
            idempotenceKey
        );
        console.log("payment", payment.id);

        // save key payment.id to redis with value userId;
        // this.redisClient.set(payment.id, userId);

        const redirectUrl = payment.confirmation.confirmation_url;

        return redirectUrl;
    }

    _byCash(): null {
        return null;
    }
}
