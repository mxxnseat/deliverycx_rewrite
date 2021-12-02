export class CategoryEntity {
    constructor(
        private readonly id: UniqueId,
        private readonly name: string,
        private readonly image: ImagePath
    ) {}

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getImage() {
        return this.image;
    }
}
