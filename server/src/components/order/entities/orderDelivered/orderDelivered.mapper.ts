import { Mapper } from "src/common/abstracts/mapper.interface";
import { OrderDeliveredEntity } from "./orderDelivered.entity";
import { OrderDeliveredPropType } from "./prop.type";
import * as moment from "moment";

export const orderDeliveredMapper: Mapper<
    Array<OrderDeliveredPropType>,
    Array<OrderDeliveredEntity>
> = (p) => {
    return p.map((el) => {
        const items = el.orders.items.map((el) => {
            return {
                amount: el.amount || 1,
                name: el.name,
                price: el.price * el.amount || el.price
            };
        });

        const totalPrice = items.reduce((acc, el) => acc + el.price, 0);
        const deliveryPrice = el.orders.deliveryPrice || 0;
        const date = moment(el.orders.date).format("DD.MM.YYYY");

        return new OrderDeliveredEntity(
            date,
            el.orders.address,
            el.orders.orderNum,
            el.orders.status,
            totalPrice + deliveryPrice,
            items,
            deliveryPrice
        );
    });
};
