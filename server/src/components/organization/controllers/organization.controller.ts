import { Controller, Get, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { OrganizationUsecase } from "../usecases/organization.usecase";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { GetAllDTO } from "../interfaces/getAll.dto";

@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationUsecase: OrganizationUsecase) {}

    @Get("all")
    async getAll(
        @Query() query: GetAllDTO,
        @Res() response: Response,
        @Req() request: Request
    ) {
        const result = await this.organizationUsecase.getAll(query.cityId);

        response.status(HttpStatus.OK).json(result);
    }
}
