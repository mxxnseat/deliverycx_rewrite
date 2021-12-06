import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";
import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeAmountDTO {
    @ApiProperty()
    @IsNumber()
    public amount: number;

    @ApiProperty()
    @IsMongoIdObject()
    public cartId: UniqueId;
}
