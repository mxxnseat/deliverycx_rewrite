import { Controller, Get, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { OrganizationUsecase } from "../usecases/organization.usecase";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { GetAllDTO } from "../interfaces/getAll.dto";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { OrganizationEntity } from "../entities/organization.entity";
import { RecvisitesEntity } from "../entities/recvisites.entity";
import { RecvisitesDTO } from "../interfaces/getRecvisites.dto";

@ApiTags("Organization endpoints")
@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationUsecase: OrganizationUsecase) {}

    @ApiResponse({
        status: 200,
        type: [OrganizationEntity]
    })
    @Get("all")
    async getAll(
        @Query() query: GetAllDTO,
        @Res() response: Response,
        @Req() request: Request
    ) {
        const result = await this.organizationUsecase.getAll(query.cityId);
        response.status(HttpStatus.OK).json(result);
    }

    @ApiResponse({
        status: 200,
        type: [RecvisitesEntity]
    })
    @Get("recvisites")
    async getRecvisites(
        @Query() query: RecvisitesDTO,
        @Res() response: Response
    ) {
        const result = await this.organizationUsecase.getRecvisites(
            query.organizationId
        );

        response.status(HttpStatus.OK).json(result);
    }
}
