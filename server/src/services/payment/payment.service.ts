import { Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import { v4 as uuidv4 } from "uuid";
import {
    YooCheckout,
    ICreatePayment,
    ICapturePayment
} from "@a2seven/yoo-checkout";
import { IPaymentWebhookDto } from "../../components/order/dto/paymentWebhook.dto";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { OrderDTO } from "src/components/order/dto/order.dto";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase
    ) {
        super();
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        const checkout = new YooCheckout({
            shopId: "866115",
            secretKey: "test_LT0AumHCI0dRW43iMJ2P8yodIlETm2sZQQb8LG9llQs"
        });

        const capturePayload: ICapturePayment = {
            amount: {
                value: body.object.amount.value,
                currency: body.object.amount.currency
            }
        };
        const payment = await checkout.capturePayment(
            body.object.id,
            capturePayload,
            body.object.id
        );

        const cart = await this.cartRepository.getAll(
            body.object.metadata.userId
        );

        await this.orderUsecase.create(body.object.metadata.userId, cart, {
            address: {
                city: body.object.metadata.address_city,
                street: body.object.metadata.address_street,
                entrance: body.object.metadata.address_entrance,
                flat: body.object.metadata.address_flat,
                floor: body.object.metadata.address_floor,
                home: body.object.metadata.address_home,
                intercom: body.object.metadata.address_intercom
            },
            comment: body.object.metadata.comment,
            name: body.object.metadata.name,
            organization: body.object.metadata.organization,
            phone: body.object.metadata.phone,
            paymentMethod: body.object.metadata.paymentMethod
        });
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<string> {
        const checkout = new YooCheckout({
            shopId: "866115",
            secretKey: "test_LT0AumHCI0dRW43iMJ2P8yodIlETm2sZQQb8LG9llQs"
        });

        const { paymentMethod, ...orderInfo } = body;
        const { address, ...rest } = orderInfo;
        const metadata = {
            ...rest,
            userId,
            address_city: address.city,
            address_street: address.street,
            address_home: address.home,
            address_entrance: address.entrance,
            address_flat: address.flat,
            address_floor: address.floor,
            address_intercom: address.intercom,
            paymentMethod
        };

        const createPayload: ICreatePayment = {
            amount: {
                value: "50.00",
                currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            capture: false as any,
            confirmation: {
                type: "redirect",
                return_url: "https://тест.хинкалыч.рф/order/success" // Set return url. Will be тест.хинкалыч.рф/order/success
            },
            metadata
        };

        const payment = await checkout.createPayment(createPayload);

        const redirectUrl = payment.confirmation.confirmation_url;

        return redirectUrl;
    }

    _byCash(): null {
        return null;
    }
}
