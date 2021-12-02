export class CartEntity {
    constructor(
        private readonly id: UniqueId,
        private readonly productName: string,
        private readonly productImage: ImagePath,
        private readonly amount: number,
        private readonly price: number
    ) {}

    public get getId() {
        return this.id;
    }

    public get getProductName() {
        return this.productName;
    }

    public get getProductImage() {
        return this.productImage;
    }

    public get getAmount() {
        return this.amount;
    }

    public get getPrice() {
        return this.price;
    }
}
