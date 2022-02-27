import {
    Body,
    Controller,
    Get,
    Query,
    Res,
    Session,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { DeliveryAddressEntity } from "../entities/addresses/deliveryAddresses.entity";
import { Response } from "express";
import { PersonalCabinetUsecase } from "../usecases/personalCabinet.usecase";
import { GetOrderDTO } from "../dto/getOrder.dto";
import { UnauthorizedFilter } from "src/filters/unauthorized.filter";
import { AuthGuard } from "src/guards/authorize.guard";

@Controller("pc")
@UseFilters(new UnauthorizedFilter())
@UsePipes(
    new ValidationPipe({
        transform: true
    })
)
@UseGuards(AuthGuard)
export class PersonalCabinetController {
    constructor(
        private readonly personalCabinetUsecase: PersonalCabinetUsecase
    ) {}

    @ApiResponse({
        status: 200
    })
    @Get("orders")
    async getOrders(
        @Session() session: Record<string, string>,
        @Res() response: Response,
        @Query() query: GetOrderDTO
    ) {
        const result = await this.personalCabinetUsecase.getOrders(
            session.user,
            query.page
        );

        response.status(200).json(result);
    }

    @ApiResponse({
        status: 200,
        type: DeliveryAddressEntity
    })
    @Get("deliveryAddresses")
    async getDeliveryAddresses(
        @Session() session: Record<string, string>,
        @Res() response: Response
    ) {
        const result = await this.personalCabinetUsecase.getAddresses(
            session.user
        );

        response.status(200).json(result);
    }
}
