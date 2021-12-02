import { injectable, unmanaged } from "inversify";
import { Model } from "mongoose";
import { Mapper } from "./mapper.interface";

export abstract class BaseRepository<ModelClass, ReturnValue> {
    constructor(
        private readonly model: Model<any>,

        private readonly mapper: Mapper<ModelClass, Array<ReturnValue>>,

        private readonly field: string,

        private readonly populateField: string = ""
    ) {}

    async getAll(id?: UniqueId): Promise<Array<ReturnValue>> {
        const result = await this.model
            .find({
                [this.field]: id
            })
            .populate(this.populateField);
        return this.mapper(result);
    }
}
