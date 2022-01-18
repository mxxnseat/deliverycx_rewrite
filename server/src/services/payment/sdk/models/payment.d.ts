import { STATUSES } from "../types";

export declare class PaymentResult {
    result: STATUSES;
    id: string;
    paymentUrl: string;
    messages: Array<IMessage>;
}

export declare class SuccessPayment extends PaymentResult {
    lastupdate: string;
}

export declare class ErrorPayment extends PaymentResult {
    suberrorcode: ;
}