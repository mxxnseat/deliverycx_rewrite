import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsObject } from "class-validator";

export class OrderDTO {
    @ApiProperty()
    organization: UniqueId;

    @ApiProperty()
    name: string;

    @ApiProperty({
        properties: {
            city: { type: "string" },
            street: { type: "string" },
            home: { type: "number", minimum: 1 },
            flat: { type: "number" },
            intercom: { type: "number" },
            entrance: { type: "number" },
            floor: { type: "number" }
        }
    })
    @IsObject()
    address: {
        city: string;
        street: string;
        home: number;
        flat: number;
        intercom: number;
        entrance: number;
        floor: number;
    };

    @ApiProperty()
    @IsPhoneNumber("RU", {
        message: () => {
            throw new BadRequestException("Не верный формат телефона");
        }
    })
    phone: string;

    @ApiProperty()
    comment: string;
}
