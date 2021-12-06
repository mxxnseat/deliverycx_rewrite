import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class RemoveOneDTO {
    @ApiProperty()
    @IsMongoIdObject()
    public cartId: UniqueId;
}
