import { PaymentMethods } from "src/services/payment/payment.abstract";

export class IPaymentWebhookDto {
    public object: {
        id: UniqueId;
        status: "waiting_for_capture" | "succeeded";
        amount: { value: string; currency: string };
        metadata: {
            email: Email;
        };
    };
}
