import {
    Body,
    Controller,
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
        @Inject("SEND_CODE_SERVICE")
        private readonly SendCodeService: SendCodeService,

        @Inject("REGISTER_SERVICE")
        private readonly RegisterService: RegisterService
    ) {}

    @Post("sendCode")
    async sendCode(@Res() response: Response, @Body() body: SendCodeDTO) {
        await this.SendCodeService.sendSMSCode(body.phone);

        response.status(204).json();
    }

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

    @Patch("update")
    async update(
        @Session() session: Record<string, string>,
        @Body() body: UpdateDTO,
        @Res() response: Response
    ) {
        await this.userUsecase.updateUser(session.user, body);

        response.status(201).json();
    }
}
