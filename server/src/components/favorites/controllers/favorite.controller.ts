import {
    Body,
    Controller,
    Put,
    Res,
    Session,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "src/guards/authorize.guard";
import { AddRemoveDTO } from "../dto/addRemove.dto";
import { ApiResponse } from "@nestjs/swagger";
import { FavoriteUsecase } from "../usecases/favorite.usecase";
import { FavoriteEntity } from "../entities/favorite.entity";
import { ForbiddenDTO } from "src/common/dto/forbidden.dto";

@Controller("favorite")
@UseGuards(AuthGuard)
@ApiResponse({
    status: 403,
    description: "Forbidden. в случае если пользователь без сессионных кук",
    type: ForbiddenDTO
})
@UsePipes(new ValidationPipe({ transform: true }))
export class FavoriteController {
    constructor(private readonly favoriteUsecase: FavoriteUsecase) {}

    @ApiResponse({
        status: 200,
        type: FavoriteEntity
    })
    @Put("click")
    async add_remove(
        @Body() body: AddRemoveDTO,
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        const result = await this.favoriteUsecase.click(
            body.productId,
            session.user
        );

        response.status(200).json(result);
    }
}
