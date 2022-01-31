export class RedirectEntity {
    constructor(private readonly redirectUrl: string) {}

    get getRedirectUrl() {
        return this.redirectUrl;
    }
}
