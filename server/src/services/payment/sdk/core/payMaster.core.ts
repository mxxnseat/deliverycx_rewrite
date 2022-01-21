import { ICreatePaymentOptions } from "../types";
import { PaymentUrlResponse } from "../models";

export interface IPayMaster {
    // createPayment(options: ICreatePaymentOptions): Promise<PaymentResponseType>;
    getPaymentUrl(): Promise<PaymentUrlResponse>;
}
