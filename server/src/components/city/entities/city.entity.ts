export class CityEntity {
    constructor(private readonly id: UniqueId, private readonly name: string) {}

    public get getId() {
        return this.id;
    }
    public get getName() {
        return this.name;
    }
}
