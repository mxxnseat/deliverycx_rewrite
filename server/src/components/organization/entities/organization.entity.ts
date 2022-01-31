import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { IsMongoIdObject } from "src/common/decorators/mongoIdValidate.decorator";

export class OrganizationEntity {
    @ApiProperty()
    @IsMongoIdObject()
    private readonly id: Types.ObjectId;

    @ApiProperty()
    private readonly address?: string;

    @ApiProperty()
    private readonly city?: string;

    @ApiProperty({
        type: "array",
        items: {
            multipleOf: 2,
            allOf: [{ type: "number" }, { type: "number" }]
        }
    })
    private readonly cords?: [number, number];

    @ApiProperty()
    private readonly phone?: string;

    @ApiProperty()
    private readonly workTime?: string;

    @ApiProperty()
    private readonly cardPay?: boolean;

    constructor(
        id: Types.ObjectId,
        address?: string,
        city?: string,
        cords?: [number, number],
        phone?: string,
        workTime?: string,
        cardPay?: boolean
    ) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.cords = cords;
        this.phone = phone;
        this.workTime = workTime;
        this.cardPay = cardPay;
    }

    public get getId() {
        return this.id;
    }

    public get getAddress() {
        return this.address;
    }

    public get getCity() {
        return this.city;
    }

    public get getCords() {
        return this.cords;
    }

    public get getPhone() {
        return this.phone;
    }

    public get getWorkTime() {
        return this.workTime;
    }

    public get getCardPay() {
        return this.cardPay;
    }
}
