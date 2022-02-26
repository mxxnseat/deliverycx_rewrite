import { ApiProperty } from "@nestjs/swagger";

interface IProduct {
    name: string;
    amount: number;
    price: number;
}

export class OrderDeliveredEntity {
    @ApiProperty()
    private readonly product: Array<IProduct>;

    @ApiProperty()
    private readonly date: string;

    @ApiProperty()
    private readonly orderNumber: string;

    @ApiProperty()
    private readonly status: DeliveryStatusEnum;

    @ApiProperty()
    private readonly totalPrice: number;

    @ApiProperty()
    private readonly deliveryAddress: string;

    @ApiProperty()
    private readonly deliveryPrice: number;

    constructor(
        date: string,
        deliveryAddress: string,
        orderNumber: string,
        status: DeliveryStatusEnum,
        totalPrice: number,
        product: Array<IProduct>,
        deliveryPrice: number
    ) {
        this.date = date;
        this.deliveryAddress = deliveryAddress;
        this.orderNumber = orderNumber;
        this.status = status;
        this.totalPrice = totalPrice;
        this.product = product;
        this.deliveryPrice = deliveryPrice;
    }

    get getDate() {
        return this.date;
    }

    get getAddress() {
        return this.deliveryAddress;
    }

    get getOrderNumber() {
        return this.orderNumber;
    }

    get getStatus() {
        return this.status;
    }

    get getProduct() {
        return this.product;
    }

    get getTotalPrice() {
        return this.totalPrice;
    }
}
