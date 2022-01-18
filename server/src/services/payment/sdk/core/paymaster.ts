import { PaymentResponseType } from "../models";
import { ICreatePaymentOptions } from "../types";
import { DeclarePayMaster } from "./paymaster.core";
import axios from "axios";

export class PayMaster extends DeclarePayMaster {
    createPayment(
        options: ICreatePaymentOptions
    ): Promise<PaymentResponseType> {
        return {} as any;
    }
}
