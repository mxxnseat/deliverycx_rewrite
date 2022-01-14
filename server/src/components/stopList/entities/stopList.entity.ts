export type FilterNoZeroBalanceType = () => Omit<
    IStopListEntity,
    "filterNoZeroBalance"
>;

export interface IStopListEntity {
    organization: UniqueId;
    stopList: Array<iiko.IStopListItem>;

    filterNoZeroBalance: FilterNoZeroBalanceType;
}

export class StopListEntity implements IStopListEntity {
    constructor(
        public readonly organization: UniqueId,
        public stopList: Array<iiko.IStopListItem>
    ) {}

    public filterNoZeroBalance() {
        return {
            organization: this.organization,
            stopList: this.stopList
        };
    }
}
