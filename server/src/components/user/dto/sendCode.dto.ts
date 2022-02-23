import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty()
    code: string;
}
