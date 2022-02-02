import { iiko } from "src/services/iiko/interfaces";
import { Injectable } from "@nestjs/common";
import { IikoError } from "./iiko.error";
import { Axios } from "src/common/abstracts/request";
import { AxiosInstance } from "axios";

@Injectable()
export class IIkoAxios extends Axios {
    public _axios: AxiosInstance;

    constructor() {
        super(
            process.env.SERVICE_URL,
            (error) =>
                error.response.data?.description || error.response.data?.message
        );
    }

    private async token() {
        const { data } = await this._axios.get<string>(
            `/api/0/auth/access_token?user_id=${process.env.SERVICE_LOGIN}&user_secret=${process.env.SERVICE_PASSWORD}`
        );

        return data;
    }

    public async orderTypes(organization) {
        const token = await this.token();
        const { data } = await this._axios.get<OrderTypesIiko>(
            `/api/0/rmsSettings/getOrderTypes?access_token=${token}&organization=${organization}`
        );

        return data;
    }

    public async orderCreate(orderData: iiko.IOrderBody) {
        const token = await this.token();

        const { data } = await this._axios.post<OrderInfoIiko>(
            `/api/0/orders/add?access_token=${token}`,
            orderData
        );

        return data;
    }

    public async checkOrder(orderData: iiko.IOrderBody) {
        const token = await this.token();

        const { data } = await this._axios.post<OrderCheckCreationResult>(
            `/api/0/orders/checkCreate?access_token=${token}`,
            orderData
        );

        return data;
    }

    public async stopList(organization: UniqueId) {
        const token = await this.token();
        const { data } = await this._axios.get<iiko.IStopListBody>(
            `/api/0/stopLists/getDeliveryStopList?access_token=${token}&organization=${organization}`
        );

        return data;
    }
}

export const iikoAxiosProviders = [
    {
        provide: "IIKO_AXIOS",
        useFactory: () => new IIkoAxios()
    }
];
