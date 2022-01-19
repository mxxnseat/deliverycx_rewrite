import { HTTP_METHODS } from ".";

import { VAT, AGENT_TYPES, PAYMENT_TYPES } from ".";

export interface ILmiShoppingCart {
    ITEMS: Array<ILmiShoppingCart_items>;
}
export interface ILmiShoppingCart_items_agent {
    TYPE: AGENT_TYPES;
}
export interface ILmiShoppingCart_items {
    NAME: string;
    QTY: string;
    PRICE: number;
    TAX: VAT;
    AGENT?: ILmiShoppingCart_items_agent;
    METHOD?: PAYMENT_TYPES;
    SUBJECT?: SUBJECT_TYPES;
}

export interface ICreatePaymentOptions {
    LMI_MERCHANT_ID: string;
    LMI_PAYMENT_AMOUNT: string;
    LMI_CURRENCY: string;
    LMI_PAYMENT_METHOD: string;
    LMI_PAYMENT_METHOD: string;
    authhash: string;

    LMI_PAYMENT_NO?: string;
    LMI_PAYMENT_DESC?: string;
    LMI_PAYMENT_DESC_BASE64?: string;
    LMI_SIM_MODE?: 0;
    LMI_PAYMENT_TYPE?: "HOLD";
    LMI_INVOICE_CONFIRMATION_URL?: string;
    LMI_PAYMENT_NOTIFICATION_URL?: string;
    LMI_SUCCESS_URL?: string;
    LMI_SUCCESS_METHOD?: HTTP_METHODS;
    LMI_FAIL_URL?: string;
    LMI_FAIL_METHOD?: HTTP_METHODS;
    LMI_PAYER_PHONE_NUMBER?: string;
    LMI_PAYER_EMAIL?: string;
    LMI_EXPIRES?: string;
    json?: 1;
    // LMI_SHOPPINGCART: ILmiShoppingCart;
}
export type CreatePaymentOptionsTypeWithoutMerchantId = Omit<
    ICreatePaymentOptions,
    "LMI_MERCHANT_ID"
>;
