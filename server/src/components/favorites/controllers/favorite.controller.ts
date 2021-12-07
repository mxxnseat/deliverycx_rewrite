import {
    Body,
    Controller,
    Put,
    Res,
    Session,
    UseFilters,
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
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";

@Controller("favorite")
@ApiResponse({
    status: 401,
    description: "в случае если пользователь без сессионных кук"
})
@UseFilters(new UnauthorizedFilter())
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(AuthGuard)
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
