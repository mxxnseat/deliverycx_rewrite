import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseErrorDTO {
    @ApiProperty()
    errors: any;
}
