import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
    @ApiProperty()
    private readonly id: UniqueId;

    @ApiProperty()
    private readonly username: string;

    @ApiProperty({
        required: false
    })
    private readonly name?: string;

    @ApiProperty({
        required: false
    })
    private readonly phone?: string;

    @ApiProperty({
        required: false
    })
    private readonly address?: string;

    constructor(
        id: UniqueId,
        username: string,
        name?: string,
        phone?: string,
        address?: string
    ) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    public get getAddress() {
        return this.address;
    }
    public get getPhone() {
        return this.phone;
    }
    public get getName() {
        return this.name;
    }
    public get getUsername() {
        return this.username;
    }
    public get getId() {
        return this.id;
    }
}
