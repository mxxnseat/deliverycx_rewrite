import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class SendCodeDTO {
    @ApiProperty({
        example: "+79786666666"
    })
    @IsPhoneNumber("RU", {
        message: () => {
            throw new BadRequestException("Не верный формат телефона");
        }
    })
    phone: string;
}
