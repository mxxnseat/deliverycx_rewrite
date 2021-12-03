import { ICityRepository } from "../repositories/interface.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CityUsecase {
    constructor(private readonly cityRepository: ICityRepository) {}

    async getAll() {
        const result = await this.cityRepository.getAll();

        return result;
    }
}
