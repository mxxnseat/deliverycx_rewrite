export namespace CreateMessage {
    export interface IRecivedBody {
        items: Array<{
            name: string;
            amount: number;
        }>;
        name: string;
        phone: string;
        address: string;
    }
}
