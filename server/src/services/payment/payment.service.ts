import { Inject, Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";
import { IPaymentWebhookDto } from "../../components/order/dto/paymentWebhook.dto";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { OrderUsecase } from "src/components/order/usecases/order.usecase";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { OrganizationModel } from "src/database/models/organization.model";
import { OrderEntity } from "src/components/order/entities/order.entity";
import { PaymentError } from "./payment.error";
import { IDeliveryService } from "../delivery/delivery.abstract";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { PayMaster } from "./sdk/core/paymaster";
import axios from "axios";
import { PaymentUrlResponse } from "./sdk/models";

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
        const organization = await OrganizationModel.findById(
            body.organization
        );

        if (!organization.yopay?.isActive) {
            throw new PaymentError("Заведение не поддерживает оплату картой");
        }

        // try {
        //     const payMaster = new PayMaster(
        //         "08121225-02f2-46dc-aff0-efd1a73ff7f1"
        //     );

        //     const data = await payMaster.getPaymentUrl();

        //     return data;
        // } catch (e) {
        //     console.log(e.response.data);
        // }
    }

    async _byCash(body: OrderDTO, userId: UniqueId): Promise<OrderEntity> {
        const result = await this.orderUsecase.create(userId, body);

        return result;
    }
}
