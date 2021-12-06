import { ApiProperty } from "@nestjs/swagger";
import { BaseErrorDTO } from "./base.dto";

export abstract class ForbiddenDTO extends BaseErrorDTO {
    @ApiProperty()
    path: string;
}
