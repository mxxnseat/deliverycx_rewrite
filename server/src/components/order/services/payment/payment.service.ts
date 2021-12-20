import { Injectable } from "@nestjs/common";
import { IPaymentService } from "./payment.abstract";

@Injectable()
export class PaymentService extends IPaymentService {
    async byCard(): Promise<string> {
        const redirectUrl = "http://ya.ru";

        return redirectUrl;
    }

    byCash(): null {
        return null;
    }
}
