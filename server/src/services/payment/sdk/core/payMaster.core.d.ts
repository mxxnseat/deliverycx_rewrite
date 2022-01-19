import { ICreatePaymentOptions } from "../types";
import { PaymentResponseType } from "../models";

export interface IPayMaster {
    createPayment(options: ICreatePaymentOptions): Promise<PaymentResponseType>;
}
