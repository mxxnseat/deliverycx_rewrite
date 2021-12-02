export abstract class CustomError extends Error {
    constructor(
        private readonly _message: string,
        private readonly _code: number
    ) {
        super();
    }

    public get message() {
        return this._message;
    }

    public get code() {
        return this._code;
    }
}
