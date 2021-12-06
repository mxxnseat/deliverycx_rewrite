import { ApiProperty } from "@nestjs/swagger";

export class CategoryEntity {
    @ApiProperty()
    private readonly id: UniqueId;

    @ApiProperty()
    private readonly name: string;

    @ApiProperty()
    private readonly image: ImagePath;

    constructor(id: UniqueId, name: string, image: ImagePath) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

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
