import { IIiko } from "./iiko.abstract";
import axios from "axios";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { BadRequestException, Inject } from "@nestjs/common";
import { OrganizationModel } from "../../database/models/organization.model";
import { IDeliveryService } from "../delivery/delivery.abstract";
import { ICheckResult, MessageResultStateEnum } from "./interfaces";
import { CannotDeliveryError } from "src/components/order/errors/order.error";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { PaymentMethods } from "../payment/payment.abstract";
import { Model } from "mongoose";
import { ProductClass } from "src/database/models/product.model";

export class IikoService implements IIiko {
    constructor(
        @InjectPinoLogger() private readonly logger: PinoLogger,
        private readonly DeliveryService: IDeliveryService,
        @Inject("PRODUCT_MODEL")
        private readonly productModel: Model<ProductClass>
    ) {}

    private async getToken() {
        try {
            const requestString = `${process.env.SERVICE_URL}/api/0/auth/access_token?user_id=${process.env.SERVICE_LOGIN}&user_secret=${process.env.SERVICE_PASSWORD}`;

            const { data: token } = await axios.get<Token>(requestString);

            return token;
        } catch (e) {
            console.log(e);
        }
    }

    /*
        this method send http request to iiko biz api
        and return number of order from iiko db
    */
    async create(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ): Promise<string> {
        const token = await this.getToken();

        const requestString = `${process.env.SERVICE_URL}/api/0/orders/add?access_token=${token}`;
        const organization = await OrganizationModel.findById(
            orderInfo.organization
        );

        const { deliveryPrice, totalPrice } =
            await this.DeliveryService.calculatingPrices(userId);

        /*
                Берем товар "доставка" для конкретной
                организации.
            */
        const deliveryProduct = await this.productModel.findOne({
            name: "Доставка",
            organization: orderInfo.organization
        });

        const { data: orderResponseInfo } = await axios.post<OrderInfoIiko>(
            requestString,
            {
                organization: organization.id,
                customer: {
                    name: orderInfo.name,
                    phone: orderInfo.phone
                },
                order: {
                    phone: orderInfo.phone,
                    address: {
                        city: orderInfo.address.city,
                        street: orderInfo.address.street,
                        home: orderInfo.address.home,
                        apartament: orderInfo.address.flat,
                        entrance: orderInfo.address.entrance,
                        floor: orderInfo.address.floor,
                        doorphone: orderInfo.address.intercom
                    },
                    items: [
                        ...cart.map((cartEl) => {
                            return {
                                id: cartEl.getProductId,
                                name: cartEl.getProductName,
                                amount: cartEl.getAmount
                            };
                        }),
                        {
                            id: deliveryProduct.id,
                            name: deliveryProduct.name,
                            amount: 1,
                            price: deliveryPrice
                        }
                    ],
                    comment: orderInfo.comment
                }
            }
        );
        this.logger.info(
            `${orderInfo.phone} ${JSON.stringify(orderResponseInfo)}`
        );

        if (orderResponseInfo.problem?.hasProblem)
            throw new CannotDeliveryError(orderResponseInfo?.problem?.problem);

        return orderResponseInfo.number;
    }

    /*
        check opportunity delivery
    */
    async check(
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ): Promise<ICheckResult> {
        const token = await this.getToken();
        const requestString = `${process.env.SERVICE_URL}/api/0/orders/checkCreate?access_token=${token}`;

        const organization = await OrganizationModel.findById(
            orderInfo.organization
        );

        const { data } = await axios.post<OrderCheckCreationResult>(
            requestString,
            {
                organization: organization.id,
                customer: {
                    name: orderInfo.name,
                    phone: orderInfo.phone
                },
                order: {
                    phone: orderInfo.phone,
                    address: {
                        city: orderInfo.address.city,
                        street: orderInfo.address.street,
                        home: orderInfo.address.home,
                        apartament: orderInfo.address.flat,
                        entrance: orderInfo.address.entrance,
                        floor: orderInfo.address.floor,
                        doorphone: orderInfo.address.intercom
                    },
                    items: cart.map((cartEl) => {
                        return {
                            id: cartEl.getProductId,
                            name: cartEl.getProductName,
                            amount: cartEl.getAmount
                        };
                    }),
                    comment: orderInfo.comment
                }
            }
        );

        return {
            numState: data.resultState,
            message: MessageResultStateEnum[`_${data.resultState}`]
        };
    }
}
