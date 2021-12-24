import { Inject, Injectable } from "@nestjs/common";
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
import { OrganizationModel } from "src/database/models/organization.model";
import { OrderEntity } from "src/components/order/entities/order.entity";
import { PaymentError } from "./payment.error";
import { CartEntity } from "src/components/cart/entities/cart.entity";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase
    ) {
        super();
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        // const organization = await OrganizationModel.findById(
        //     body.object.metadata.organization
        // );
        // const checkout = new YooCheckout({
        //     shopId: organization.yopay.shopId,
        //     secretKey: organization.yopay.token
        // });
        // const checkout = new YooCheckout({
        //     shopId: "866226",
        //     secretKey: "test_gFszEGngAoFqiWaJGd-YxRzAg5TPc2BkbB4vUO586jM"
        // });
        // const capturePayload: ICapturePayment = {
        //     amount: {
        //         value: body.object.amount.value,
        //         currency: body.object.amount.currency
        //     }
        // };
        // const payment = await checkout.capturePayment(
        //     body.object.id,
        //     capturePayload,
        //     body.object.id
        // );
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const organization = await OrganizationModel.findById(
            body.organization
        );

        if (!organization.yopay.isActive) {
            throw new PaymentError("Заведение не поддерживает оплату картой");
        }

        const checkout = new YooCheckout({
            shopId: organization.yopay.shopId,
            secretKey: organization.yopay.token
        });

        const createPayload: ICreatePayment = {
            amount: {
                value: (await this.cartRepository.calc(userId)).toString(),
                currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card",
                card: {
                    cardholder: "unknown",
                    csc: body.cvv,
                    expiry_month: body.expires.month,
                    expiry_year: body.expires.year,
                    number: body.cardNumber
                }
            },
            capture: true as any,
            confirmation: {
                type: "redirect",
                return_url: "https://тест.хинкалыч.рф/order/success"
            }
        };

        const payment = await checkout.createPayment(createPayload);

        if (payment.status === "succeeded") {
            const orderResult = await this.orderUsecase.create(userId, body);
            return orderResult;
        } else {
            throw new PaymentError("Оплата отменена");
        }
    }

    _byCash(): null {
        return null;
    }
}
