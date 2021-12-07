export class BaseError {
    constructor(private readonly error: any, private readonly status: number) {}

    public get getError() {
        return this.error;
    }

    public get getStatus() {
        return this.status;
    }
}
