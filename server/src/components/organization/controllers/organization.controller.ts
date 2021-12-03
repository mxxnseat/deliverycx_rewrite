import { Controller, Get, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { OrganizationUsecase } from "../usecases/organization.usecase";
import { Types } from "mongoose";
import { Request, Response } from "express";

@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationUsecase: OrganizationUsecase) {}

    @Get("all")
    async getAll(
        @Query("cityId") cityId: UniqueId,
        @Res() response: Response,
        @Req() request: Request
    ) {
        const result = await this.organizationUsecase.getAll(cityId);

        response.status(HttpStatus.OK).json(result);
    }
}
