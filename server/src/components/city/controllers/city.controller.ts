import { Controller, Get } from "@nestjs/common";
import { CityUsecase } from "../usecases/city.usecase";

@Controller("city")
export class CityController {
    constructor(private readonly cityUsecase: CityUsecase) {}

    @Get("all")
    async getAll() {
        const result = this.cityUsecase.getAll();

        return result;
    }
}
