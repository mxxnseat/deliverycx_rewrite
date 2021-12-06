import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseErrorDTO {
    @ApiProperty()
    message: string;
}
