import { IPayMaster } from "./paymaster.core";
import axios from "axios";
import {
    CreatePaymentOptionsTypeWithoutMerchantId,
    ICreatePaymentOptions
} from "../types";
import { PaymentResponseType } from "../models";

export class PayMaster implements IPayMaster {
    // createPayment(
    //     options: ICreatePaymentOptions
    // ): Promise<PaymentResponseType> {
    //     return {} as any;
    // }
    constructor(private readonly merchantId: string) {}

    async createPayment(
        options: CreatePaymentOptionsTypeWithoutMerchantId
    ): Promise<PaymentResponseType> {
        console.log({
            ...options,
            LMI_MERCHANT_ID: this.merchantId
        });
        const { data } = await axios.post<PaymentResponseType>(
            "https://paymaster.ru/builtinpayment/init",
            {
                ...options,
                LMI_MERCHANT_ID: this.merchantId
            }
        );

        return data;
    }
}

// export class PayMaster
