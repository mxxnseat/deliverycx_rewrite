import { Body, Controller, Post, Req, Session } from "@nestjs/common";
import { Request } from "express";
import { GenerateUsernameService } from "../services/guestUsername.service";
import { UserUsecase } from "../usecases/user.usecase";

@Controller("user")
export class UserController {
    constructor(
        private readonly userUsecase: UserUsecase,
        private readonly generateUsernameService: GenerateUsernameService
    ) {}

    @Post("create")
    async create(@Session() session: Record<string, string>) {
        const username = await this.generateUsernameService.generate();

        const result = await this.userUsecase.create(username);
        session.user = result.getId;
        return result;
    }
}
