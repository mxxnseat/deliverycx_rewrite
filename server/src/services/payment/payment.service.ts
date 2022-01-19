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
import { IDeliveryService } from "../delivery/delivery.abstract";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { PayMaster } from "./sdk/core/paymaster";
import {
    CreatePaymentOptionsTypeWithoutMerchantId,
    ICreatePaymentOptions
} from "./sdk/types";
import * as md5 from "crypto-js/md5";
import * as Base64 from "crypto-js/enc-base64";
import axios from "axios";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        @InjectPinoLogger() private readonly logger: PinoLogger,

        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase,
        private readonly DeliveryService: IDeliveryService
    ) {
        super();
    }

    async captrurePayment(body: IPaymentWebhookDto) {
        //LOGGER
        // this.mailService.sendMail(body.object.metadata.email);
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<any> {
        try {
            const payMaster = new PayMaster(
                "08121225-02f2-46dc-aff0-efd1a73ff7f1"
            );
            const { totalPrice } = await this.DeliveryService.calculatingPrices(
                userId,
                body.orderType
            );

            const authhash = md5(
                `08121225-02f2-46dc-aff0-efd1a73ff7f1 ${2}.00 RUB test`
            ).toString();

            // добавляется обязательный параметр authhash
            //  содержащий подпись запроса. Необходимо использовать тип подписи (sha1\sha256\md5)
            //  указанный в настройках сайта в ЛК. При запуске платежа в подписи участвуют параметры
            //   LMI_MERCHANT_ID, LMI_PAYMENT_AMOUNT (с отделением дробной части через точку и обязательными двумя знаками после точки),
            // LMI_CURRENCY, SecretKey (значение настраивается в личном кабинете).

            // console.log(authhash, authhash.toString());
            const options: CreatePaymentOptionsTypeWithoutMerchantId = {
                json: 1,
                LMI_CURRENCY: "RUB",
                LMI_SIM_MODE: 0,
                LMI_PAYMENT_AMOUNT: "2.00",
                LMI_PAYMENT_METHOD: "WebMoney",
                SecretKey: "test",

                LMI_PAYER_EMAIL: body.email,
                authhash
            } as any;
            const response = await payMaster.createPayment(options);
            console.log(response);
        } catch (e) {
            console.log(e);
        }

        // const organization = await OrganizationModel.findById(
        //     body.organization
        // );
        // if (!organization.yopay?.isActive) {
        //     throw new PaymentError("Заведение не поддерживает оплату картой");
        // }
        // const checkout = new YooCheckout({
        //     shopId: organization.yopay.shopId,
        //     secretKey: organization.yopay.token
        // });

        // const cart = await this.cartRepository.getAll(userId);
        // const createPayload: ICreatePayment = {
        //     amount: {
        //         value: deliveryPrice.totalPrice.toString() + ".00",
        //         currency: "RUB"
        //     },
        //     receipt: {
        //         customer: {
        //             email: body.email
        //         },
        //         items: [
        //             ...cart.map((cartEl, index) => {
        //                 return {
        //                     description: cartEl.getProductName,
        //                     quantity: cartEl.getAmount + ".00",
        //                     amount: {
        //                         value:
        //                             cartEl.getPrice / cartEl.getAmount + ".00",
        //                         currency: "RUB"
        //                     },
        //                     vat_code: "1"
        //                 };
        //             }),
        //             {
        //                 description: "Доставка",
        //                 quantity: "1.00",
        //                 amount: {
        //                     value: deliveryPrice.deliveryPrice + ".00",
        //                     currency: "RUB"
        //                 },
        //                 vat_code: "1"
        //             }
        //         ]
        //     } as any,
        //     payment_method_data: {
        //         type: "bank_card",
        //         card: {
        //             cardholder: "unknown",
        //             csc: body.cvv,
        //             expiry_month: body.expires.month,
        //             expiry_year: body.expires.year,
        //             number: body.cardNumber
        //         }
        //     },
        //     metadata: {
        //         email: body.email
        //     },
        //     capture: true as any,
        //     confirmation: {
        //         type: "redirect",
        //         return_url: "https://тест.хинкалыч.рф/order/success"
        //     }
        // };
        // const payment = await checkout.createPayment(createPayload);
        // this.logger.info(`${body.phone} ${JSON.stringify(payment)}`);
        // if (payment.status === "succeeded") {
        // const orderResult = await this.orderUsecase.create(userId, body);
        //     return orderResult;
        // } else {
        //     throw new PaymentError("Оплата отменена");
        // }
    }

    async _byCash(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const result = await this.orderUsecase.create(userId, body);

        return result;
    }
}
