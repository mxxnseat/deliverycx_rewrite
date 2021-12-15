import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class UpdateDTO {
    @ApiProperty({
        type: "string"
    })
    @IsMongoId()
    organizationId: UniqueId;
}
