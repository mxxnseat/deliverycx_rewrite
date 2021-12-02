export class UserEntity {
    public get getAddress() {
        return this.address;
    }
    public get getPhone() {
        return this.phone;
    }
    public get getName() {
        return this.name;
    }
    public get getUsername() {
        return this.username;
    }
    constructor(
        private readonly username: string,
        private readonly name?: string,
        private readonly phone?: string,
        private readonly address?: string
    ) {}
}
