import { Injectable } from "@nestjs/common";
import { IStopListRepository } from "../repositories/interface.repository";

@Injectable()
export class StopListUsecase {
    constructor(private readonly stopListRepository: IStopListRepository) {}

    public async get(organization: UniqueId) {
        const stopListEntity = await this.stopListRepository.getAll(
            organization
        );

        return stopListEntity.filterNoZeroBalance();
    }

    public async update(
        organization: UniqueId,
        stopListArray: Array<iiko.IStopListItem>
    ) {
        await this.stopListRepository.update(organization, stopListArray);
    }

    public async delete(
        organization: UniqueId,
        stopListArray: Array<iiko.IStopListItem>
    ) {
        await this.stopListRepository.deleteSome(organization, stopListArray);
    }
}
