// import axios, { Axios } from "axios";
import { AxiosInstance } from "axios";
import { Axios } from "src/common/abstracts/request";
import { PaymasterRequest } from "../types/request.type";

import { PaymasterResponse } from "../types/response.type";

export class PaymasterRequests extends Axios {
    public _axios: AxiosInstance;

    constructor() {
        super("https://paymaster.ru", (error) => error);
    }

    public async invoices(
        requestBody: PaymasterRequest.IInvoice,
        token: string
    ) {
        const { data } = await this._axios.post<PaymasterResponse.IInvoice>(
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
