import {
    Body,
    Controller,
    Patch,
    Post,
    Req,
    Res,
    Session
} from "@nestjs/common";
import { Request, response, Response } from "express";
import { GenerateUsernameService } from "../services/guestUsername.service";
import { UserUsecase } from "../usecases/user.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";
import { UpdateDTO } from "../dto/update.dto";

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
            const user = await this.userUsecase.getUser(session.user);

            let result = user;

            if (!user.check()) {
                const username = await this.generateUsernameService.generate();
                result = await this.userUsecase.create(username);
                session.user = result.getId;
            }

            return response.status(200).json(result);
        }

        const username = await this.generateUsernameService.generate();
        const result = await this.userUsecase.create(username);
        session.user = result.getId;

        response.status(200).json(result);
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
