import { ApiProperty } from "@nestjs/swagger";

export class ProductEntity {
    @ApiProperty()
    private readonly id: string | undefined;

    @ApiProperty()
    private readonly name?: string;

    @ApiProperty()
    private readonly description?: string;

    @ApiProperty()
    private readonly additionalInfo?: string;

    @ApiProperty()
    private readonly price?: number;

    @ApiProperty()
    private readonly weight?: number;

    @ApiProperty({
        enum: ["шт", "порц"]
    })
    private readonly measureUnit?: "шт" | "порц";

    @ApiProperty()
    private readonly image?: ImagePath;

    @ApiProperty()
    private readonly categoryImage?: ImagePath;

    constructor(
        id: string | undefined,
        name?: string,
        description?: string,
        additionalInfo?: string,
        price?: number,
        weight?: number,
        measureUnit?: "шт" | "порц",
        image?: ImagePath,
        categoryImage?: ImagePath
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.additionalInfo = additionalInfo;
        this.price = price;
        this.weight = weight;
        this.measureUnit = measureUnit;
        this.image = image;
        this.categoryImage = categoryImage;
    }

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
}
