import { Inject, Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import {
    IPaymentWebhookDto,
    IPaymentWebhookParams
} from "../../components/order/dto/paymentWebhook.dto";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { OrganizationClass } from "src/database/models/organization.model";
import { OrderEntity } from "src/components/order/entities/order.entity";
import { PaymentError } from "./payment.error";
import { IDeliveryService } from "../delivery/delivery.abstract";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Paymaster } from "./sdk/common/paymaster";
import { Model } from "mongoose";
import { encodeBody } from "./utils/encodeBody";
import { decodeBody } from "./utils/decodeBody";

@Injectable()
export class PaymentService extends IPaymentService {
    constructor(
        @InjectPinoLogger() private readonly logger: PinoLogger,
        @Inject("Paymaster") private readonly Paymaster: Paymaster,
        @Inject("Organization")
        private readonly OrganizationModel: Model<OrganizationClass>,

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
        const organization = await this.OrganizationModel.findById(
            body.organization
        );

        if (!organization.yopay?.isActive) {
            throw new PaymentError("Заведение не поддерживает оплату картой");
        }

        const d = {
            merchantId: "08121225-02f2-46dc-aff0-efd1a73ff7f1",
            testMode: true,
            amount: {
                currency: "RUB",
                value: "2.00"
            },
            invoice: {
                description: "test payment",
                params: {
                    user: userId,
                    ...encodeBody(body)
                }
            },
            protocol: {
                callbackUrl:
                    "https://cxdevproxy.ngrok.io/webhook/paymentCallback"
            }
        };
        const paymentResult = await this.Paymaster.paymentUrl(
            d,
            "aaea0234c7bf60d5dd33de271d2eed0a3723109c93a6fa726557a625f58fc888dfbc81a0ca2cdc4cb49f37eb41cae3b5a37e"
        );

        return paymentResult;
    }

    async _byCash(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const result = await this.orderUsecase.create(userId, body);

        return result;
    }
}
