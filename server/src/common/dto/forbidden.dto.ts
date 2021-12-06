import { ApiProperty } from "@nestjs/swagger";

export abstract class ForbiddenDTO {
    @ApiProperty()
    path: string;

    @ApiProperty()
    message: string;
}
