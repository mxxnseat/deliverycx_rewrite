export interface OrderDeliveredPropType {
    orders: {
        items: Array<{
            name: string;
            price: number;
            amount: number;
        }>;
        price: number;
        deliveryPrice: number;
        address: string;
        orderNum: string;
        date: Date;
        status: DeliveryStatusEnum;
    };
}
