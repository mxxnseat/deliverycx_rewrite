import { ApiProperty } from "@nestjs/swagger";

export class CityQueryDTO {
    @ApiProperty({
        example: "симф"
    })
    public readonly search: string;
}
