export namespace Bot {
    export interface IRequestBody {
        items: Array<{
            name: string;
            amount: number;
        }>;
        name: string;
        phone: string;
        address: string;
    }
}
