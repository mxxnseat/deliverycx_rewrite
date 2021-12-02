export class OrganizationEntity {
    constructor(
        private readonly id: UniqueId,
        private readonly address?: string,
        private readonly city?: string,
        private readonly cords?: [number, number],
        private readonly phone?: string
    ) {}

    public get getId() {
        return this.id;
    }

    public get getAddress() {
        return this.address;
    }

    public get getCity() {
        return this.city;
    }

    public get getCords() {
        return this.cords;
    }

    public get getPhone() {
        return this.phone;
    }
}
