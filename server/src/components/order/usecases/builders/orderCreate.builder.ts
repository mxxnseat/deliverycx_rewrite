import { Inject, Injectable, Scope } from "@nestjs/common";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { ICartRepository } from "src/components/cart/repositories/interface.repository";
import { IDeliveryService } from "src/services/delivery/delivery.abstract";
import { IBotService } from "src/services/duplicateBot/bot.abstract";
import { IIiko } from "src/services/iiko/iiko.abstract";
import { OrderDTO } from "../../dto/order.dto";
import { OrderEntity } from "../../entities/order.entity";
import { IOrderRepository } from "../../repositores/interface.repository";

interface IState {
    user: UniqueId;
    orderInfo: OrderDTO;
    cart: Array<CartEntity>;
    orderNumber: number | string;
}

@Injectable({ scope: Scope.REQUEST })
export class OrderCreateBuilder {
    private _state: IState = {} as IState;

    constructor(
        @Inject("IIiko")
        private readonly orderService: IIiko,

        private readonly orderRepository: IOrderRepository,
        private readonly CartRepository: ICartRepository,

        private readonly DeliveryService: IDeliveryService,

        private readonly botService: IBotService
    ) {}

    async initialize(userId: UniqueId, orderInfo: OrderDTO) {
        this._state.orderInfo = orderInfo;
        this._state.user = userId;

        this._state.cart = await this.CartRepository.getAll(userId);
    }

    async createOrder() {
        const user = this._state.user;
        const orderInfo = this._state.orderInfo;

        const cart = await this.CartRepository.getAll(user);

        const deliveryPrices = await this.DeliveryService.calculatingPrices(
            this._state.user,
            orderInfo.orderType
        );

        const orderNumber = await this.orderService.create(
            cart,
            orderInfo,
            deliveryPrices
        );

        await this.orderRepository.create(
            user,
            deliveryPrices.totalPrice,
            orderNumber
        );

        this._state.orderNumber = orderNumber;

        await this.CartRepository.removeAll(user);
    }

    duplicateOrder() {
        const {
            address: { city, street, home },
            name,
            phone,
            organization
        } = this._state.orderInfo;

        const address = `${city}, улица ${street}, д. ${home}`;
        const customer = {
            name,
            phone
        };

        this.botService.sendDuplicate(
            address,
            customer,
            organization,
            this._state.cart
        );
    }

    getOrderEntity(): OrderEntity {
        return new OrderEntity(this._state.orderNumber);
    }
}
