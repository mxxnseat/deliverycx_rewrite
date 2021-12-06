import { Controller, Get } from "@nestjs/common";
import { CityUsecase } from "../usecases/city.usecase";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CityEntity } from "../entities/city.entity";

@ApiTags("City endpoints")
@Controller("city")
export class CityController {
    constructor(private readonly cityUsecase: CityUsecase) {}

    @ApiResponse({
        status: 200,
        type: [CityEntity]
    })
    @Get("all")
    async getAll() {
        const result = this.cityUsecase.getAll();

        return result;
    }
}
