import { ApiProperty } from "@nestjs/swagger";

export class OrderEntity {
    @ApiProperty()
    private readonly number: number;

    constructor(number: number) {
        this.number = number;
    }
}
