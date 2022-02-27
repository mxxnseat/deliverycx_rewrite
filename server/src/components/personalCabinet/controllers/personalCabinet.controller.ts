import { Body, Controller, Get, Query, Res, Session } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { DeliveryAddressEntity } from "../entities/addresses/deliveryAddresses.entity";
import { Response } from "express";
import { PersonalCabinetUsecase } from "../usecases/personalCabinet.usecase";
import { GetOrderDTO } from "../dto/getOrder.dto";

@Controller("pc")
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
        @Query() query: GetOrderDTO,
        @Body() body: any
    ) {
        const result = await this.personalCabinetUsecase.getOrders(
            body.user,
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
        @Res() response: Response,
        @Body() body: any
    ) {
        const result = await this.personalCabinetUsecase.getAddresses(
            body.user
        );

        response.status(200).json(result);
    }
}
