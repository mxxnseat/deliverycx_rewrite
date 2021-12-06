import { ApiProperty } from "@nestjs/swagger";

export class OrderEntity {
    @ApiProperty()
    private readonly number: number | string;

    constructor(number: number | string) {
        this.number = number;
    }

    public get getNumber() {
        return this.number;
    }
}
