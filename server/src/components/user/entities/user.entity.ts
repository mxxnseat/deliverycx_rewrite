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
    public get getId() {
        return this.id;
    }

    constructor(
        private readonly id: UniqueId,
        private readonly username: string,
        private readonly name?: string,
        private readonly phone?: string,
        private readonly address?: string
    ) {}
}
