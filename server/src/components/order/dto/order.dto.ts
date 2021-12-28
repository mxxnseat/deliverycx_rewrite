import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsObject, IsOptional, IsEmail } from "class-validator";
import { IsCardCvv } from "src/common/decorators/cardCvv.decorator";
import { IsCardExpires } from "src/common/decorators/cardExpires.decorator";
import { IsCardNumber } from "src/common/decorators/cardNumber.decorator";
import { prepareYear } from "src/common/decorators/expiresYear.decorator";
import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";
import { PaymentMethods } from "../../../services/payment/payment.abstract";

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

    @ApiProperty({
        enum: PaymentMethods
    })
    paymentMethod: PaymentMethods;

    @ApiProperty({
        example: "2200 0000 0000 0000",
        examples: [
            "2200 0000 0000 0000",
            "4111 1111 1111 1111",
            "2200000000000000",
            "4111111111111111"
        ]
    })
    @IsCardNumber("", { message: "Не верный формат карты" })
    @IsOptional()
    cardNumber?: string;

    @ApiProperty({ example: 777 })
    @IsCardCvv("", { message: "Не правильный cvv/csv код" })
    @IsOptional()
    cvv?: string;

    @ApiProperty({
        properties: {
            year: { type: "number", example: 29 },
            month: { type: "number", example: 12 }
        }
    })
    @prepareYear()
    @IsCardExpires("", { message: "Не верно указана дата" })
    @IsOptional()
    expires?: ExpiresType;

    @ApiProperty({ required: false })
    @IsEmail({ message: "Не корректный e-mail" })
    @IsOptional()
    email?: string;
}
