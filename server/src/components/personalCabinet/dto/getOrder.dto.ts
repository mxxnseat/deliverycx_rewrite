import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class GetOrderDTO {
    @ApiProperty()
    public page: number = 0;
}
