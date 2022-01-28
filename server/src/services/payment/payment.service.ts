import { Inject, Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import { IPaymentWebhookParams } from "../../components/order/dto/paymentWebhook.dto";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { OrderEntity } from "src/components/order/entities/order.entity";
import { PaymentError } from "./payment.error";
import { IDeliveryService } from "../delivery/delivery.abstract";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Paymaster } from "./sdk/common/paymaster";
import { encodeBody } from "./utils/encodeBody";
import { decodeBody } from "./utils/decodeBody";
import { intToDecimal } from "./utils/intToDecimal";
import { IOrganizationRepository } from "src/components/organization/repositories/interface.repository";
import * as crypto from "crypto";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        @InjectPinoLogger() private readonly logger: PinoLogger,
        @Inject("Paymaster") private readonly Paymaster: Paymaster,

        private readonly organizationRepository: IOrganizationRepository,
        private readonly cartRepository: ICartRepository,
        private readonly orderUsecase: OrderUsecase,
        private readonly DeliveryService: IDeliveryService
    ) {
        super();
    }

    async captrurePayment(body: IPaymentWebhookParams) {
        const preparedBody = decodeBody<OrderDTO & { user: string }>(body);

        console.log(preparedBody);
        // this.orderUsecase.create(preparedBody.user, preparedBody);
    }

    async _byCard(body: OrderDTO, userId: UniqueId): Promise<any> {
        // checking bank card support

        const organizationPaymentInfo =
            await this.organizationRepository.getPaymentsInfo(
                body.organization
            );

        if (!organizationPaymentInfo.isActive) {
            throw new PaymentError("Заведение не поддерживает оплату картой");
        }

        const { totalPrice } = await this.DeliveryService.calculatingPrices(
            userId,
            body.orderType
        );
        const returnUrlHash = crypto.randomBytes(8).toString("hex");

        const payMasterBody = {
            merchantId: organizationPaymentInfo.merchantId,
            testMode: true,
            amount: {
                currency: "RUB",
                value: intToDecimal(totalPrice)
            },
            invoice: {
                description: 'Оплата заказа в "Старик Хинкалыч"',
                params: {
                    user: userId,
                    ...encodeBody(body)
                }
            },
            protocol: {
                callbackUrl: process.env.PAYMENT_SERVICE_CALLBACK_URL,
                returnUrl: `${process.env.CLIENT_PATH}/success?hash=${returnUrlHash}`
            }
        };

        const paymentResult = await this.Paymaster.paymentUrl(
            payMasterBody,
            organizationPaymentInfo.token
        );

        return paymentResult;
    }

    async _byCash(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const result = await this.orderUsecase.create(userId, body);

        return result;
    }
}
