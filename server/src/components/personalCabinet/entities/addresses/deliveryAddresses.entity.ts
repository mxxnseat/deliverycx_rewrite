import { ApiProperty } from "@nestjs/swagger";

interface NestedAddress {
    city: string;
    address: string;
}

export class DeliveryAddressEntity {
    @ApiProperty()
    private readonly name: string;

    @ApiProperty()
    private readonly address: NestedAddress;

    constructor(name: string, address: NestedAddress) {
        this.name = name;
        this.address = address;
    }

    get getName() {
        return this.name;
    }

    get getAddress() {
        return this.address;
    }
}
