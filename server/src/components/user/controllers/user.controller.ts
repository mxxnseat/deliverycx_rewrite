import { Body, Controller, Post, Req, Res, Session } from "@nestjs/common";
import { Request, Response } from "express";
import { GenerateUsernameService } from "../services/guestUsername.service";
import { UserUsecase } from "../usecases/user.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

@ApiTags("User endpoints")
@Controller("user")
export class UserController {
    constructor(
        private readonly userUsecase: UserUsecase,
        private readonly generateUsernameService: GenerateUsernameService
    ) {}

    @Post("create")
    @ApiResponse({
        status: 200,
        type: UserEntity
    })
    async create(
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        if (session.user) {
            return response
                .status(200)
                .json(await this.userUsecase.getUser(session.user));
        }
        const username = await this.generateUsernameService.generate();
        const result = await this.userUsecase.create(username);
        session.user = result.getId;

        response.status(200).json(result);
    }
}
