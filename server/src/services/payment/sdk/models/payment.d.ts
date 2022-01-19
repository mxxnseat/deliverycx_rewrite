import { STATUSES, ERROR_CODES } from "../types";

export declare class PaymentResult {
    result: STATUSES;
    id: string;
    paymentUrl: string;
    messages: Array<IMessage>;

    constructor();
}

export declare class SuccessPayment extends PaymentResult {
    lastupdate: string;

    constructor();
}

export declare class ErrorPayment extends PaymentResult {
    suberrorcode: ERROR_CODES;

    constructor();
}

export declare type PaymentResponseType = ErrorPayment | SuccessPayment;
