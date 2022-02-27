import {
    Body,
    Controller,
    Get,
    Inject,
    Patch,
    Post,
    Req,
    Res,
    Session,
    UseFilters,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { Request, response, Response } from "express";
import { UserUsecase } from "../usecases/user.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";
import { SendCodeService } from "../services/sendCode/sendCode.service";
import { RegisterDTO, SendCodeDTO, UpdateDTO } from "../dto";
import { RegisterService } from "../services/register/register.service";
import { UpdateOptionsService } from "../services/updateUserOptions/updateOptions.service";
import { InjectTokenEnum } from "../providers/constants";
import { DeliveryAddressEntity } from "../../personalCabinet/entities/addresses/deliveryAddresses.entity";

@ApiTags("User endpoints")
@Controller("user")
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
export class UserController {
    constructor(
        private readonly userUsecase: UserUsecase,
        @Inject(InjectTokenEnum.SEND_CODE_SERVICE)
        private readonly SendCodeService: SendCodeService,

        @Inject(InjectTokenEnum.UPDATE_OPTIONS_SERVICE)
        private readonly UpdateOptionsService: UpdateOptionsService,

        @Inject(InjectTokenEnum.REGISTER_SERVICE)
        private readonly RegisterService: RegisterService
    ) {}

    @ApiResponse({
        status: 204
    })
    @Post("sendCode")
    async sendCode(@Res() response: Response, @Body() body: SendCodeDTO) {
        await this.SendCodeService.sendSMSCode(body.phone);

        response.status(204).json();
    }

    @ApiResponse({
        status: 200,
        type: UserEntity
    })
    @Post("register")
    async register(
        @Session() session: Record<string, string>,
        @Res() response: Response,
        @Body() body: RegisterDTO
    ) {
        const userEntity = await this.RegisterService.register(
            session.user,
            body.code
        );

        response.status(200).json(userEntity);
    }

    @Post("create")
    @ApiResponse({
        status: 200,
        type: UserEntity
    })
    async create(
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        let user: UserEntity;

        if (session.user) {
            user = await this.userUsecase.getUser(session.user);

            if (!user.check()) {
                user = await this.userUsecase.createGuest();
                session.user = user.getId;
            }

            return response.status(200).json(user);
        }

        user = await this.userUsecase.createGuest();
        session.user = user.getId;

        response.status(200).json(user);
    }

    @ApiResponse({
        status: 204
    })
    @Patch("update")
    async update(
        @Session() session: Record<string, string>,
        @Body() body: UpdateDTO,
        @Res() response: Response
    ) {
        await this.UpdateOptionsService.update(session.user, body);

        response.status(204).json();
    }
}
