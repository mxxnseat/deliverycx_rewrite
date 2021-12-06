import { IIiko } from "./iiko.abstract";
import axios from "axios";
import { CartEntity } from "src/components/cart/entities/cart.entity";
import { OrderDTO } from "src/components/order/dto/order.dto";
import { OrderError } from "src/common/errors/order.error";

export class IikoService implements IIiko {
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
        cart: Array<CartEntity>,
        orderInfo: OrderDTO
    ): Promise<Error | string> {
        try {
            console.log("SEND REQUEST TO IIKO");
            const token = await this.getToken();

            const requestString = `${process.env.SERVICE_URL}/api/0/orders/add?access_token=${token}`;
            console.log(orderInfo);
            const { data: orderResponseInfo } = await axios.post<OrderInfoIiko>(
                requestString,
                {
                    organization: orderInfo.organization,
                    customer: {
                        name: orderInfo.name,
                        phone: orderInfo.phone
                    },
                    order: {
                        phone: orderInfo.phone,
                        address: {
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
                        })
                    }
                }
            );

            console.log(orderResponseInfo);

            if (orderResponseInfo.problem.hasProblem)
                return new OrderError(orderResponseInfo.problem.problem);

            return orderResponseInfo.number;
        } catch (e) {
            console.log(e);
        }
    }
}
