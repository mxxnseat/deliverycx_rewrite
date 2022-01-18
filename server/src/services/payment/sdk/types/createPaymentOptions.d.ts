import { HTTP_METHODS } from "./enum";

export interface ICreatePaymentOptions {
    merchantId: string;
    paymentAmount: number;
    currency: string;
    paymentNumber?: string;
    paymentDescription?: string;
    paymentDescription_base64?: string;
    isTest?: 0;
    paymentType?: "HOLD";
    invoceConfirmationUrl?: string;
    paymentNotificationUrl?: string;
    successUrl?: string;
    successMethod?: HTTP_METHODS;
    failUrl?: string;
    failMethod?: HTTP_METHODS;
    clientPhoneNumber?: string;
    clientEmail?: string;
    expires?: string;
}
