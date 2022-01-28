import axios, { Axios } from "axios";
import { PaymasterRequest } from "../types/request.type";

import { PaymasterResponse } from "../types/response.type";

export class PaymasterRequests {
    private axios: Axios;

    constructor() {
        this.init();
    }

    private init() {
        this.axios = axios.create({
            baseURL: "https://paymaster.ru"
        });

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public async invoices(
        requestBody: PaymasterRequest.IInvoice,
        token: string
    ) {
        const { data } = await this.axios.post<PaymasterResponse.IInvoice>(
            "/api/v2/invoices",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return data;
    }
}
