export class IPaymentWebhookDto {
    public object: {
        id: UniqueId;
        status: "waiting_for_capture" | "succeded";
        amount: { value: string; currency: string };
    };
}
