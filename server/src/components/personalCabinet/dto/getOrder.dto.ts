import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsMongoId } from "class-validator";
import { BaseError } from "src/common/errors/base.error";

export class GetOrderDTO {
    @ApiProperty()
    @IsInt({
        message: () => {
            throw new BaseError("tttt", 400);
        }
    })
    public page: number = 0;
}
