import { StopListEntity } from "../entities/stopList.entity";

export abstract class IStopListRepository {
    abstract update(
        organization: UniqueId,
        stopListArray: Array<iiko.IStopListItem>
    ): Promise<void>;

    abstract getAll(organization: UniqueId): Promise<StopListEntity>;
}
