import { ApiProperty } from "@nestjs/swagger";

export class CartEntity {
    @ApiProperty()
    private readonly id: UniqueId;

    @ApiProperty()
    private readonly productName: string;

    @ApiProperty()
    private readonly productImage: ImagePath;

    @ApiProperty()
    private readonly productId: UniqueId;

    @ApiProperty({
        minimum: 1
    })
    private readonly amount: number;

    @ApiProperty()
    private readonly price: number;

    constructor(
        id: UniqueId,
        productName: string,
        productImage: ImagePath,
        productId: UniqueId,
        amount: number,
        price: number
    ) {
        this.id = id;
        this.productName = productName;
        this.productImage = productImage;
        this.productId = productId;
        this.amount = amount;
        this.price = price;
    }

    public get getId() {
        return this.id;
    }

    public get getProductName() {
        return this.productName;
    }

    public get getProductImage() {
        return this.productImage;
    }

    public get getProductId() {
        return this.productId;
    }

    public get getAmount() {
        return this.amount;
    }

    public get getPrice() {
        return this.price;
    }
}
