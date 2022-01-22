/// <reference path="interfaces.ts">

import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { IikoError } from "./iiko.error";

@Injectable()
export class IIkoAxios {
    private axios: AxiosInstance;

    constructor() {
        this.init();
    }

    private init() {
        this.axios = axios.create({
            baseURL: process.env.SERVICE_URL
        });

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(
                    new IikoError(error.response.data?.description)
                );
            }
        );
    }

    private async token() {
        const { data } = await this.axios.get<string>(
            `/api/0/auth/access_token?user_id=${process.env.SERVICE_LOGIN}&user_secret=${process.env.SERVICE_PASSWORD}`
        );

        return data;
    }

    public async orderTypes(organization) {
        const token = await this.token();
        const { data } = await this.axios.get<OrderTypesIiko>(
            `/api/0/rmsSettings/getOrderTypes?access_token=${token}&organization=${organization}`
        );

        return data;
    }

    public async orderCreate(orderData: iiko.IOrderBody) {
        const token = await this.token();

        const { data } = await this.axios.post<OrderInfoIiko>(
            `/api/0/orders/add?access_token=${token}`,
            orderData
        );

        return data;
    }

    public async checkOrder(orderData: iiko.IOrderBody) {
        const token = await this.token();

        const { data } = await this.axios.post<OrderCheckCreationResult>(
            `/api/0/orders/checkCreate?access_token=${token}`,
            orderData
        );

        return data;
    }

    public async stopList(organization: UniqueId) {
        const token = await this.token();
        const { data } = await this.axios.get<iiko.IStopListBody>(
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
