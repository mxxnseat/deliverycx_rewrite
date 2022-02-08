export namespace CreateMessage {
    export interface IRecivedBody {
        items: Array<{
            name: string;
            amount: number;
        }>;
        name: string;
        comment: string;
        phone: string;
        address: string;
    }
}
