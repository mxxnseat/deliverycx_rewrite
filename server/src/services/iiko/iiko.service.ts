import { iiko } from "src/services/iiko/interfaces";
import { IIiko, OrderTypesEnum } from "./iiko.abstract";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { Inject } from "@nestjs/common";
import { IDeliveryService } from "../delivery/delivery.abstract";
import { CannotDeliveryError } from "src/components/order/errors/order.error";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Model } from "mongoose";
import { ProductClass } from "src/database/models/product.model";
import { IIkoAxios } from "./iiko.axios";
import { StopListUsecase } from "src/components/stopList/usecases/stopList.usecase";
import { OrganizationClass } from "src/database/models/organization.model";

export class IikoService implements IIiko {
    constructor(
        @Inject("Product")
        private readonly productModel: Model<ProductClass>,

        @Inject("Organization")
        private readonly organizationModel: Model<OrganizationClass>,

        @Inject("IIKO_AXIOS")
        private readonly axios: IIkoAxios,

        private readonly DeliveryService: IDeliveryService,

        private readonly StopListUsecase: StopListUsecase,

        @InjectPinoLogger() private readonly logger?: PinoLogger
    ) {}

    /*-----------------| createOrderBody |-----------------------*/
    private async createOrderBody(
        orderInfo: OrderDTO,
        cart: Array<CartEntity>,
        userId: UniqueId
    ) {
        const organization = await this.organizationModel.findById(
            orderInfo.organization
        );

        /*
            Получение айдишнка типа заказа
        */
        const orderTypeId = await this.getOrderTypesId(
            orderInfo.organization,
            orderInfo.orderType
        );

        const { deliveryPrice, totalPrice } =
            await this.DeliveryService.calculatingPrices(
                userId,
                orderInfo.orderType
            );

        /*
            Берем товар "доставка" для конкретной
            организации.
        */
        const deliveryProduct = await this.productModel.findOne({
            name: "Доставка",
            organization: orderInfo.organization
        });

        const requestOrderItems = [
            ...cart.map((cartEl) => {
                return {
                    id: cartEl.getProductId,
                    name: cartEl.getProductName,
                    amount: cartEl.getAmount
                };
            }),
            deliveryProduct
                ? {
                      id: deliveryProduct.id,
                      name: deliveryProduct.name,
                      amount: 1,
                      price: deliveryPrice
                  }
                : undefined
        ].filter(Boolean);

        const result = {
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
                items: requestOrderItems,
                comment: orderInfo.comment,
                orderTypeId: orderTypeId,
                isSelfService: (orderInfo.orderType === OrderTypesEnum.PICKUP
                    ? "true"
                    : "false") as "true" | "false"
            }
        };

        return result;
    }

    /*-----------------| getOrderTypesId |-----------------------*/
    private async getOrderTypesId(
        organizationId: UniqueId,
        orderType: OrderTypesEnum
    ) {
        const organizationGUID = await this.organizationModel.findById(
            organizationId,
            { id: 1 }
        );

        const data = await this.axios.orderTypes(organizationGUID.id);

        const result = data.items.find((orderTypeEl) => {
            return orderTypeEl.orderServiceType.includes(orderType);
        });

        return result.id;
    }

    /*-----------------|      create     |-----------------------*/
    /*
        this method send http request to iiko biz api
        and return number of order from iiko db
    */
    async create(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ): Promise<string> {
        const orderBody = await this.createOrderBody(orderInfo, cart, userId);

        const orderResponseInfo = await this.axios.orderCreate(orderBody);

        this.logger.info(
            `${orderInfo.phone} ${JSON.stringify(orderResponseInfo)}`
        );

        if (orderResponseInfo.problem?.hasProblem)
            throw new CannotDeliveryError(orderResponseInfo?.problem?.problem);

        return orderResponseInfo.number;
    }

    /*-----------------|       check      |-----------------------*/
    /*
        check opportunity delivery
    */
    async check(
        userId: UniqueId,
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ): Promise<iiko.ICheckResult> {
        const orderCheckBody = await this.createOrderBody(
            orderInfo,
            cart,
            userId
        );

        const data = await this.axios.checkOrder(orderCheckBody);

        return {
            numState: data.resultState,
            message: iiko.MessageResultStateEnum[`_${data.resultState}`]
        };
    }

    /*-----------------|    getStopList    |-----------------------*/
    /*
        get stop-list and sending to the client
        by websocket.
        save stop-list to the stopList collection
    */
    async getStopList(body: iiko.IWebhookEvent) {
        const data = await this.axios.stopList(body.organizationId);
        const stopList = data.stopList
            .map((stopListArrayItem) => stopListArrayItem.items)
            .flat();

        const stopListArray = stopList.map((el) => {
            return {
                ...el,
                product: el.productId
            };
        });

        const stopListEntity = await this.StopListUsecase.stopListEventAction(
            body.organizationId,
            stopListArray
        );

        return stopListEntity;
    }
}
