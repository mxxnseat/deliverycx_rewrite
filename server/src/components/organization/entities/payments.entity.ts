export class PaymentInfoEntity {
    constructor(
        private readonly _merchantId?: UniqueId,
        private readonly _token?: string,
        private readonly _isActive?: boolean
    ) {}

    public get merchantId() {
        return this._merchantId;
    }

    public get token() {
        return this._token;
    }

    public get isActive() {
        return this._isActive;
    }
}
