import { ICreatePaymentOptions } from "../types";

declare class PayMaster {
    constructor() {}

    createPayment(options: ICreatePaymentOptions): Promise<Payment>;
}
