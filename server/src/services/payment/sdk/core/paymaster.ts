import { IPayMaster } from "./paymaster.core";
import axios from "axios";
import {
    CreatePaymentOptionsTypeWithoutMerchantId,
    ICreatePaymentOptions
} from "../types";
import { PaymentResponseType, PaymentUrlResponse } from "../models";

export class PayMaster implements IPayMaster {
    // createPayment(
    //     options: ICreatePaymentOptions
    // ): Promise<PaymentResponseType> {
    //     return {} as any;
    // }
    constructor(private readonly merchantId: string) {}

    public async getPaymentUrl() {
        console.log(this.merchantId);
        const { data } = await axios.post<PaymentUrlResponse>(
            `https://paymaster.ru/api/v2/invoices`,
            {
                merchantId: this.merchantId,
                invoice: {
                    description: "test payment"
                },
                testMode: true,
                amount: {
                    value: 1.25,
                    currency: "RUB"
                }
            },
            {
                headers: {
                    Authorization: `Bearer 83da598196a5fa9ea59b0726e4e0ca249375828e3b8fab1044adef3d75a6d68945e4175c422a9447aaf8c63258ef09fb489a`
                }
            }
        );

        return data;
    }

    async createPayment(
        options: CreatePaymentOptionsTypeWithoutMerchantId
    ): Promise<PaymentResponseType> {
        console.log({
            ...options,
            LMI_MERCHANT_ID: this.merchantId
        });

        const { data } = await axios.post<PaymentResponseType>(
            "https://paymaster.ru/api/v2/payments",
            {
                ...options,
                LMI_MERCHANT_ID: this.merchantId
            }
        );

        return data;
    }
}

// export class PayMaster
