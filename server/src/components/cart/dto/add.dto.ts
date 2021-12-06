import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class cartDTO {
    @ApiProperty({
        description: "Mongo id object"
    })
    @IsMongoIdObject()
    public productId: UniqueId;
}
