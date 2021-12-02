export class ProductEntity {
    public get getId(): string | undefined {
        return this.id;
    }
    public get getMeasureUnit() {
        return this.measureUnit;
    }
    public get getWeight() {
        return this.weight;
    }
    public get getPrice() {
        return this.price;
    }
    public get getAdditionalInfo() {
        return this.additionalInfo;
    }
    public get getDescription() {
        return this.description;
    }
    public get getName() {
        return this.name;
    }

    public getImage() {
        return this.image;
    }

    public getCategoryImage() {
        return this.categoryImage;
    }

    public map() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            additionalInfo: this.additionalInfo,
            price: this.price,
            weight: this.weight,
            measureUnit: this.measureUnit,
            image: this.image,
            categoryImage: this.categoryImage
        };
    }

    constructor(
        private readonly id: string | undefined,
        private readonly name?: string,
        private readonly description?: string,
        private readonly additionalInfo?: string,
        private readonly price?: number,
        private readonly weight?: number,
        private readonly measureUnit?: "шт" | "порц",
        private readonly image?: ImagePath,
        private readonly categoryImage?: ImagePath
    ) {}
}
