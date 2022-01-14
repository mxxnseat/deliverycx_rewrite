import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { BaseRepository } from "src/common/abstracts/base.repository";
import { BaseError } from "src/common/errors/base.error";
import { StopListClass } from "src/database/models/stopList.model";
import { StopListEntity } from "../entities/stopList.entity";
import { stopListMapper } from "../entities/stopList.mapper";
import { IStopListRepository } from "./interface.repository";

@Injectable()
export class stopListRepository
    extends BaseRepository<StopListClass, StopListEntity>
    implements IStopListRepository
{
    constructor(
        @Inject("STOP_LIST_MODEL")
        private readonly StopListModel: Model<StopListClass>
    ) {
        super(StopListModel, stopListMapper, "stopList.product");
    }

    async deleteSome(
        organization: string,
        stopListArray: Array<iiko.IStopListItem>
    ): Promise<void> {}

    async update(
        organization: string,
        stopListArray: Array<iiko.IStopListItem>
    ): Promise<void> {}
}
