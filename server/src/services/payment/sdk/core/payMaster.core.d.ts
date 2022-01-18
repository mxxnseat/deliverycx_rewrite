import { ICreatePaymentOptions } from "../types";
import {} from "../models";

declare class PayMaster {
    constructor() {}

    createPayment(options: ICreatePaymentOptions): Promise<Payment>;
}
