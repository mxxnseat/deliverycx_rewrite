import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsObject } from "class-validator";
import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class OrderDTO {
    @ApiProperty()
    @IsMongoIdObject()
    organization: UniqueId;

    @ApiProperty()
    name: string;

    @ApiProperty({
        properties: {
            city: { type: "string", example: "Симферополь" },
            street: { type: "string", example: "Турецкая" },
            home: { type: "number", minimum: 1, example: 15 },
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
