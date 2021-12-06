import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsObject } from "class-validator";

export class OrderDTO {
    @ApiProperty()
    organization: UniqueId;

    @ApiProperty()
    name: string;

    @ApiProperty({
        properties: {
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
        street: string;
        home: number;
        flat: number;
        intercom: number;
        entrance: number;
        floor: number;
    };

    @ApiProperty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    comment: string;
}
