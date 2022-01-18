import { ICreatePaymentOptions } from "../types";
import { PaymentResponseType } from "../models";

export declare class DeclarePayMaster {
    constructor();

    createPayment(options: ICreatePaymentOptions): Promise<PaymentResponseType>;
}
