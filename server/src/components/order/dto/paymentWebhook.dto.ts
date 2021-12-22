import { PaymentMethods } from "src/services/payment/payment.abstract";

export class IPaymentWebhookDto {
    public object: {
        id: UniqueId;
        status: "waiting_for_capture" | "succeded";
        amount: { value: string; currency: string };
        metadata: {
            address_city: string;
            address_street: string;
            address_home: number;
            address_entrance: number;
            address_flat: number;
            address_floor: number;
            address_intercom: number;
            comment: string;
            userId: UniqueId;
            organization: string;
            name: string;
            phone: string;
            paymentMethod: PaymentMethods;
        };
    };
}
