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
import { MailService } from "../mail/mail.service";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase,
        private readonly mailService: MailService
    ) {
        super();
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        //LOGGER
        // this.mailService.sendMail(body.object.metadata.email);
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const organization = await OrganizationModel.findById(
            body.organization
        );

        if (!organization.yopay?.isActive) {
            throw new PaymentError("Заведение не поддерживает оплату картой");
        }

        const checkout = new YooCheckout({
            shopId: organization.yopay.shopId,
            secretKey: organization.yopay.token
        });

        const amountValue = (await this.cartRepository.calc(userId)).toString();
        const cart = await this.cartRepository.getAll(userId);
        const createPayload: ICreatePayment = {
            amount: {
                value: amountValue,
                currency: "RUB"
            },
            receipt: {
                customer: {
                    email: body.email
                },
                items: cart.map((cartEl) => {
                    return {
                        description: cartEl.getProductName,
                        quantity: cartEl.getAmount,
                        amount: {
                            value: cartEl.getPrice / cartEl.getAmount + ".00",
                            currency: "RUB"
                        },
                        vat_code: cartEl.getAmount
                    };
                })
            } as any,
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
            metadata: {
                email: body.email
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
