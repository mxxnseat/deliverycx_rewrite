import { ApiProperty } from "@nestjs/swagger";

export class OrganizationEntity {
    @ApiProperty()
    private readonly id: UniqueId;

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

    constructor(
        id: UniqueId,
        address?: string,
        city?: string,
        cords?: [number, number],
        phone?: string
    ) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.cords = cords;
        this.phone = phone;
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
}
